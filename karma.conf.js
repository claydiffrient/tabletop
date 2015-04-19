module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'spec' ],
    webpack: require('./webpack.development'),
    webpackMiddleware: {
      noInfo: process.env.CONTINUOUS_INTEGRATION
    }
  });
};
