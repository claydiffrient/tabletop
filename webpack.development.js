var webpack = require('webpack');
var webpackConfig = require('./webpack.production');

webpackConfig.debug = true;

webpackConfig.plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('development')
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })
];

webpackConfig.module.preLoaders = [
  // { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsxhint' },
];

webpackConfig.module.postLoaders = [
  {
    test: /\.jsx$/,
    exclude: /(test|node_modules|bower_components)\//,
    loader: 'istanbul-instrumenter'
  }
];

module.exports = webpackConfig;
