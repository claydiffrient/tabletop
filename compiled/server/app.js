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

// Make sure our env variable is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Read in all the models.
_fs2['default'].readdirSync(__dirname + '/models').forEach(function (file) {
  require('./models/' + file);
});

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
app.use(_express2['default']['static'](_path2['default'].join(__dirname, '../client')));

/* GET All routes, let react-router handle routing
   on the client side
*/
app.get('*', function (req, res) {
  res.render('home', {
    env: process.env.NODE_ENV
  });
});

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