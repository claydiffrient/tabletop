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

module.exports = webpackConfig;
