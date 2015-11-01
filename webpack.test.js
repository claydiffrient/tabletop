var webpackConfig = require('./webpack.development');

webpackConfig.module.postLoaders = [
  {
    test: /\.(jsx|js)$/,
    exclude: /(test|node_modules|bower_components)\//,
    loader: 'istanbul-instrumenter'
  }
];

module.exports = webpackConfig;
