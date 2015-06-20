var webpackConfig = require('./webpack.development');

webpackConfig.module.postLoaders = [
  {
    test: /\.jsx$/,
    exclude: /(test|node_modules|bower_components)\//,
    loader: 'istanbul-instrumenter'
  }
];

module.exports = webpackConfig;
