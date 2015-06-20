module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    browserNoActivityTimeout: 60000,// default 10000
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'spec', 'coverage' ],
    webpack: require('./webpack.test'),
    webpackMiddleware: {
      noInfo: process.env.CONTINUOUS_INTEGRATION
    },

    coverageReporter: {
      dir: 'coverage/client',
      reporters: [
        { type: 'lcov', subdir: 'lcov-report' },
        { type: 'lcovonly', subdir: '..', file: 'client-lcov.info'}
      ]
    }
  });
};
