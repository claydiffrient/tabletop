var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development.js');
var gls = require('gulp-live-server');
var doxx = require('gulp-doxx');
var semistandard = require('gulp-semistandard');
var mocha = require('gulp-mocha');

var server = gls.new('./bin/run');

var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'inline-source-map';
devConfig.debug = true;

var devCompiler = webpack(devConfig);

/**
 * Pipes all JS files from the server source directory
 * through babel and copies the resulting files to the
 * compiled server directory.
 */
gulp.task('babel:server', function () {
  return gulp.src('src/server/**/*.js')
             .pipe(babel())
             .pipe(gulp.dest('compiled/server'));
});

gulp.task('babel:test', function () {
  return gulp.src('src/test/server/**/*.js')
             .pipe(babel())
             .pipe(gulp.dest('compiled/test/server'));
});

/**
 * Builds the assets with webpack via babel
 */
gulp.task('babel:client:dev', function (callback) {
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError('babel:client:dev', err);
    gutil.log('[babel:client:dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js', 'gulpfile.js'])
             .pipe(semistandard())
             .pipe(semistandard.reporter('default', {
               breakOnError: true
             }));
});

gulp.task('test:server', ['babel:server', 'babel:test'], function () {
  return gulp.src('compiled/test/server/**/*.js')
             .pipe(mocha());
});

gulp.task('test', ['lint', 'test:server']);

/**
 * Watches the server source directory for changes and
 * triggers the babel:server task
 */
gulp.task('watch:server', function () {
  var jsWatcher = gulp.watch('src/server/**/*.js', ['babel:server', 'docs']);
  var viewWatcher = gulp.watch('src/server/views/**/*.handlebars', ['copy:server:views']);
  var notify = function (event) {
    server.stop();
    server.start();
    // server.notify(event);
  };
  jsWatcher.on('change', notify);
  viewWatcher.on('change', notify);
});

/**
 * Watches the client source directory for changes and triggers
 * the webpack:client:build-dev task
 */
gulp.task('watch:client', function () {
  var clientWatch = gulp.watch('src/client/**/*.js', ['webpack:client:build-dev', 'docs']);
  clientWatch.on('change', function (event) {
    server.notify(event);
  });
});

/**
 * Watches the test source directory for changes and triggers the necessary
 * compilation steps.
 */

gulp.task('watch:test', function () {
  gulp.watch('src/test/server/**/*.js', ['babel:test']);
});

gulp.task('copy:server:views', function () {
  return gulp.src('src/server/views/**/*.handlebars')
             .pipe(gulp.dest('compiled/server/views'));
});

gulp.task('serve', function () {
  server.start();
});

gulp.task('watch', ['watch:client', 'watch:server']);

var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'inline-source-map';
devConfig.debug = true;

var devCompiler = webpack(devConfig);

/**
 * Runs webpack on the client side assets for development.
 */
gulp.task('webpack:client:build-dev', function (callback) {
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:client:build', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

/**
 * Generate documentation
 */
gulp.task('docs', function () {
  gulp.src(['./src/**/*.js', 'README.md'], {base: '.'})
      .pipe(doxx({
        title: 'Tabletop Game Selector',
        urlPrefix: '/docs'
      }))
      .pipe(gulp.dest('docs')) // For ease of access in the repo
      .pipe(gulp.dest('compiled/client/docs')); // For hosting in the app
});

/**
 * The task that runs by default whenever another task isn't specified.
 */
gulp.task('default', ['serve', 'watch:server', 'watch:client', 'docs']);