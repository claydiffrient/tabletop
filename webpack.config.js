var path = require('path');

module.exports = {
  entry: './client/app',

  output: {
    filename: 'main.js',
    path: path.join('server', 'public', 'javascripts'),
  },

  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM'}
    ]
  }
};