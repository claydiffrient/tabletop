var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var methodOverride = require('method-override');
var compress = require('compression');
var config = require('config');
var passport = require('passport');
var SlackStrategy = require('passport-slack').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var axios = require('axios');
var flash = require('connect-flash');
var Rollbar = require('rollbar');
Rollbar.init(config.get('Rollbar.serverToken'));

// Make sure our env variable is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Send errors to Rollbar if in prod
if (process.env.NODE_ENV === 'production') {
  Rollbar.handleUncaughtExceptions(config.get('Rollbar.serverToken'));
}

// Make testing better maybe?
if (process.env.NODE_ENV === 'test') {
  var mockgoose = require('mockgoose');
  mockgoose(mongoose);
}

mongoose.connect(config.get('Db.url'));

// Read in all the models.
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  require('./models/' + file);
});

// Include in the route files
var routes = require('./routes/index');
var authorizationRoutes = require('./routes/authorization');
var apiRoutes = require('./routes/api/index');

var app = express();

// view engine setup
var viewDir = path.join(__dirname, 'views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: viewDir + '/layouts',
    partialsDir: viewDir + '/partials'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
if (app.get('env') === 'development') {
  app.use(logger('dev'));
} else if (app.get('env') === 'production') {
  app.use(compress());
}

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.get('Session.sessionSecret')
}));
app.use(flash());

// Use passport for authentication/authorization
var User = mongoose.model('User');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, '-password', function (err, user) {
    done(err, user);
  });
});

// Local Login
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, {message: 'User not found'});
      }
      user.comparePassword(password, function (err, match) {
        if (err) return done(err);
        if (!match) {
          return done(null, false, {message: 'Incorrect password'});
        }
        user = user.toObject();
        user.id = user._id;
        delete user.password;
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        console.log(user);
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        return done(null, user);
      });
    });
  }
));

// Local Signup
passport.use('local-signup', new LocalStrategy({
  usernameField: 'local_username',
  passwordField: 'local_password',
  passReqToCallback: true
}, function (req, username, password, done) {
    process.nextTick(function () {
      User.findOne({'username': username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {message: 'Username already in use'});
        } else {
          var newUser = new User({
            username: username,
            password: password
          });
          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            delete newUser.password;
            return done(null, newUser);
          });
        }
      });
    });
  }
));

// Slack Authentication
passport.use(new SlackStrategy({
    clientID: config.get('Slack.clientId'),
    clientSecret: config.get('Slack.clientSecret'),
    callbackURL: config.get('Slack.callbackURL'),
    team: config.get('Slack.teamId'),
    scope: ['identify', 'read'],
    scopeSeparator: ',',
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {

  // Handle the linking case
  if (!req.user.isNew) {
    User.findOne({username: req.user.username}, function (err, user) {
      if (err) { return done(err);}
      user.authentication.slack = {
        name: profile.displayName,
        id: profile.id,
        teamId: profile._json.team_id,
        token: accessToken
      };

      user.save(function (err) {
        if (err) {return done(err);}
        return done(err, user);
      });
    });
  } else {
    User.findOne({slackId: profile.id}, function (err, user) {
      if (err) {return done(err);}
      if (user) {return done(err, user);}
      if (!user) {
        var userObj = {
          provider: profile.provider,
          slackId: profile.id,
          slackName: profile.displayName,
          slackTeamId: profile._json.team_id
        };
        if (accessToken) {
          // We'll do a call to get more info if a token is provided.
          axios
            .get('https://slack.com/api/users.info', {
              params: {
                token: accessToken,
                user: profile.id
              }
            })
            .then(function (response) {
              if (response.data.ok) {
                // If this worked out... let's use this information to augment
                // our user object.
                userObj.firstName = response.data.user.profile.first_name;
                userObj.lastName = response.data.user.profile.last_name;
                userObj.email = response.data.user.profile.email;
                var user = new User(userObj);
                user.save(function (err) {
                  if (err) {return done(err);}
                  return done(err, user);
                });
              } else {
                // If there was a problem with the response... go on with
                // business as usual.
                user = new User(userObj);
                user.save(function (err) {
                  if (err) {return done(err);}
                  return done(err, user);
                });
              }
            })
            .catch(function (response) {
                  // If there was an error getting more info,
                  // we'll just ignore that and go with the original info.
                  var user = new User(userObj);
                  user.save(function (err) {
                    if (err) {return done(err);}
                    return done(err, user);
                  });
                });
        } else {
          user = new User(userObj);
          user.save(function (err) {
            if (err) {return done(err);}
            return done(err, user);
          });
        }
      }
    });
  }
}
));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authorizationRoutes);
app.use('/api', apiRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
