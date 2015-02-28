var express = require('express');
var path = require('path');
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

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else if (process.env.NODE_ENV === 'production') {
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

passport.use(new SlackStrategy({
    clientID: config.get('Slack.clientId'),
    clientSecret: config.get('Slack.clientSecret'),
    callbackURL: config.get('Slack.callbackURL')
}, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({SlackId:profile.id}, function (err, user) {
        return done(err, user);
    });
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
