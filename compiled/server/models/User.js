'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

exports['default'] = _waterline2['default'].Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    username: { type: 'string', required: true, unique: true },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    games: {
      collection: 'game',
      via: 'owners',
      dominant: true
    }
  }
});
module.exports = exports['default'];