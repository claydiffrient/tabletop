var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main:'./client/app',
    vendor: ['react', 'react-router', 'react-chartjs', 'axios']
  },

  output: {
    filename: 'main.js',
    path: path.join('server', 'public', 'javascripts'),
  },

  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM'}
    ]
  },

  plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ]
};