var webpack = require('webpack');
var path = require('path');

module.exports = {
  target: 'web',
  debug: false,
  devtool: 'source-map',
  entry: {
    app: [
      './src/client/index'
    ]
  },
  output: {
    path: path.join(__dirname, 'compiled/client/'),
    publicPath: '/',
    filename: '[name].js'
  },
  jshint: {
    esnext: true
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.(jsx|js)$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.scss$/, loader: 'style!css!scss' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.html(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'file?name=[path][name].[ext]&context=src' }
    ]
  }
};
