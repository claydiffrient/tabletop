'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

// Make sure our env variable is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Read in all the models.
_fs2['default'].readdirSync(__dirname + '/models').forEach(function (file) {
  require('./models/' + file);
});

// Include in the route files
var routes = require('./routes/index');
var authorizationRoutes = require('./routes/authorization');
var apiRoutes = require('./routes/api/index');

var app = (0, _express2['default'])();

// view engine setup
var viewDir = _path2['default'].join(__dirname, 'views');
app.engine('handlebars', (0, _expressHandlebars2['default'])({
  defaultLayout: 'main',
  layoutsDir: viewDir + '/layouts',
  partialsDir: viewDir + '/partials'
}));
app.set('views', _path2['default'].join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use((0, _serveFavicon2['default'])(__dirname + '/public/favicon.ico'));
if (app.get('env') === 'development') {
  app.use((0, _morgan2['default'])('dev'));
} else if (app.get('env') === 'production') {
  app.use((0, _compression2['default'])());
}

app.use((0, _methodOverride2['default'])());
app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({ extended: false }));
app.use((0, _cookieParser2['default'])());
app.use((0, _expressSession2['default'])({
  saveUninitialized: true,
  resave: true,
  secret: _config2['default'].get('Session.sessionSecret')
}));
app.use(flash());

// Use passport for authentication/authorization
var User = mongoose.model('User');
app.use(_passport2['default'].initialize());
app.use(_passport2['default'].session());

_passport2['default'].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2['default'].deserializeUser(function (id, done) {
  User.findById(id, '-password', function (err, user) {
    done(err, user);
  });
});

// Local Login
_passport2['default'].use(new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) return done(err);
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    user.comparePassword(password, function (err, match) {
      if (err) return done(err);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
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
}));

// Local Signup
_passport2['default'].use('local-signup', new LocalStrategy({
  usernameField: 'local_username',
  passwordField: 'local_password',
  passReqToCallback: true
}, function (req, username, password, done) {
  process.nextTick(function () {
    User.findOne({ 'username': username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: 'Username already in use' });
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
}));

// Slack Authentication
_passport2['default'].use(new SlackStrategy({
  clientID: _config2['default'].get('Slack.clientId'),
  clientSecret: _config2['default'].get('Slack.clientSecret'),
  callbackURL: _config2['default'].get('Slack.callbackURL'),
  team: _config2['default'].get('Slack.teamId'),
  scope: ['identify', 'read'],
  scopeSeparator: ',',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {

  // Handle the linking case
  if (!req.user.isNew) {
    User.findOne({ username: req.user.username }, function (err, user) {
      if (err) {
        return done(err);
      }
      user.authentication.slack = {
        name: profile.displayName,
        id: profile.id,
        teamId: profile._json.team_id,
        token: accessToken
      };

      user.save(function (err) {
        if (err) {
          return done(err);
        }
        return done(err, user);
      });
    });
  } else {
    User.findOne({ slackId: profile.id }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(err, user);
      }
      if (!user) {
        var userObj = {
          provider: profile.provider,
          slackId: profile.id,
          slackName: profile.displayName,
          slackTeamId: profile._json.team_id
        };
        if (accessToken) {
          // We'll do a call to get more info if a token is provided.
          axios.get('https://slack.com/api/users.info', {
            params: {
              token: accessToken,
              user: profile.id
            }
          }).then(function (response) {
            if (response.data.ok) {
              // If this worked out... let's use this information to augment
              // our user object.
              userObj.firstName = response.data.user.profile.first_name;
              userObj.lastName = response.data.user.profile.last_name;
              userObj.email = response.data.user.profile.email;
              var user = new User(userObj);
              user.save(function (err) {
                if (err) {
                  return done(err);
                }
                return done(err, user);
              });
            } else {
              // If there was a problem with the response... go on with
              // business as usual.
              user = new User(userObj);
              user.save(function (err) {
                if (err) {
                  return done(err);
                }
                return done(err, user);
              });
            }
          })['catch'](function (response) {
            // If there was an error getting more info,
            // we'll just ignore that and go with the original info.
            var user = new User(userObj);
            user.save(function (err) {
              if (err) {
                return done(err);
              }
              return done(err, user);
            });
          });
        } else {
          user = new User(userObj);
          user.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(err, user);
          });
        }
      }
    });
  }
}));

app.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));

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