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
var mongoose = require('mongoose');

// Make sure our env variable is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


mongoose.connect(config.get('Db.url'));
mongoose.connection.on('connected', function () {
    console.log('Mongoose Connected');
})


// Read in all the models.
fs.readdirSync(__dirname + "/models").forEach(function(file) {
  require("./models/" + file);
});

// Include in the route files
var routes = require('./routes/index');
var authorizationRoutes  = require('./routes/authorization');

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
//app.use(favicon(__dirname + '/public/favicon.ico'));
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

// Use passport for authentication/authorization
var User = mongoose.model('User');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new SlackStrategy({
    clientID: config.get('Slack.clientId'),
    clientSecret: config.get('Slack.clientSecret'),
    callbackURL: config.get('Slack.callbackURL')
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({slackId: profile.id}, function (err, user) {
        if (err) {return done(err);}
        if (user) {return done(err, user);}
        if (!user) {
            var user = new User({
                provider: profile.provider,
                slackId: profile.id,
                displayName: profile.displayName,
                slackTeamId: profile._json.team_id
            });
            user.save(function (err) {
                if (err) {return done(err);}
                return done(err, user);
            });
        }
    });
    // User.findOrCreate({
    //     provider: profile.provider,
    //     slackId: profile.id,
    //     displayName: profile.displayName,
    //     slackTeamId: profile._json.team_id
    // }, accessToken, function (err, user) {
    //     return done(err, user);
    // });
}
));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authorizationRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
