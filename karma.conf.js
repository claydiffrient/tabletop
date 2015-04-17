module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'spec' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(js|jsx)$/, loader: 'babel-loader'}
        ]
      }
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['.jsx', '.js', '']
    },
    webpackServer: {
      noInfo: false
    },
    plugins: [
      require('karma-webpack'),
      require('karma-spec-reporter'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader')
    ]
  });
};

// module.exports = function (config) {
//   config.set({
//     browsers: [ 'Chrome' ],
//     singleRun: true,
//     frameworks: [ 'mocha' ],
//     files: [
//       'test/client/**/*.js'
//     ],
//     preprocessors: {
//       'test/client/**/*.js': [ 'webpack', 'sourcemap' ]
//     },
//     reporters: [ 'spec' ],
//     webpack: {
//       devtool: 'inline-source-map',
//       module: {
//         loaders: [
//           { test: /\.(js|jsx)$/, loader: 'babel-loader'}
//         ]
//       }
//     },
//     resolve: {
//       modulesDirectories: ['node_modules'],
//       extensions: ['', '.js', '.jsx']
//     },
//     webpackServer: {
//       noInfo: true
//     }
//   });
// };
