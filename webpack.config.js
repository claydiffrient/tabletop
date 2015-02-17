var path = require('path');
var webpack = require('webpack');

console.log(path.resolve('./server/public/javascripts'));

module.exports = {
  entry: {
    main:'./client/app',
    vendor: ['react', 'react-router', 'react-chartjs',
             'axios', 'lodash']
  },

  output: {
    filename: 'main.js',
    path: path.resolve('./server/public/javascripts')
  },

  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM'}
    ]
  },

  debug: true,

  plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ]
};