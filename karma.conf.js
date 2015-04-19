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
    reporters: [ 'spec', 'coverage' ],
    webpack: require('./webpack.development'),
    webpackMiddleware: {
      noInfo: process.env.CONTINUOUS_INTEGRATION
    },

    coverageReporter: {
      dir: 'coverage/client',
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    }
  });
};
