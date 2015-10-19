var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development.js');
var gls = require('gulp-live-server');
var doxx = require('gulp-doxx');
var semistandard = require('gulp-semistandard');
var mocha = require('gulp-mocha');
var apidoc = require('gulp-apidoc');
var sourcemaps = require('gulp-sourcemaps');

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
             .pipe(sourcemaps.init())
             .pipe(babel())
             .pipe(sourcemaps.write('.'))
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

gulp.task('build', ['babel:server', 'babel:client:dev', 'copy:static_assets'], function (callback) {
  callback();
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

gulp.task('test', ['test:server']);

/**
 * Watches the server source directory for changes and
 * triggers the babel:server task
 */
gulp.task('watch:server', ['copy:server:views'], function () {
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
  var clientWatch = gulp.watch('src/client/**/*.*', ['babel:client:dev', 'docs']);
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

gulp.task('copy:static_assets', function () {
  return gulp.src('src/static_assets/**/*.*')
             .pipe(gulp.dest('compiled/client'));
});

gulp.task('serve', ['build'], function () {
  server.start();
});

gulp.task('watch', ['watch:client', 'watch:server']);

/**
 * Generate documentation
 */
gulp.task('docs:code', function () {
  return gulp.src(['./src/**/*.js', 'README.md'], {base: '.'})
             .pipe(doxx({
               title: 'Tabletop Game Selector',
               urlPrefix: '/docs'
             }))
             .pipe(gulp.dest('docs')) // For ease of access in the repo
             .pipe(gulp.dest('compiled/client/docs')); // For hosting in the app
});

gulp.task('docs:api:generate', (done) => {
  return apidoc({
    src: 'src/server/routes/api',
    dest: 'docs/api'
  }, done);
});

gulp.task('docs:api', ['docs:api:generate'], function () {
  return gulp.src('docs/api/**/*.*')
             .pipe(gulp.dest('compiled/client/docs/api'));
});

gulp.task('docs', ['docs:code', 'docs:api']);

/**
 * The task that runs by default whenever another task isn't specified.
 */
gulp.task('default', ['build', 'serve', 'watch:server', 'watch:client', 'docs']);
