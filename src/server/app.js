import express from 'express';
import path from 'path';
import fs from 'fs';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import methodOverride from 'method-override';
import compress from 'compression';
import config from 'config';

// Make sure our env variable is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Read in all the models.
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  require('./models/' + file);
});

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
app.use(favicon(path.join(__dirname, '/../client/favicon.ico')));
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
app.use(express.static(path.join(__dirname, '../client')));

var apiRoutes = require('./routes/api/index')(app);
console.log(apiRoutes);
console.log(app);

app.use('/api', apiRoutes);

/* GET All routes, let react-router handle routing
   on the client side
*/
app.get('*', (req, res) => {
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
