'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

exports['default'] = _waterline2['default'].Collection.extend({
  identity: 'game',
  connection: 'default',
  attributes: {
    bggId: {
      type: 'integer',
      index: true,
      unique: true,
      required: true
    },
    title: {
      type: 'string',
      unique: true,
      required: true,
      index: true
    },
    thumbnailUrl: { type: 'string' },
    minPlayers: { type: 'integer' },
    maxPlayers: { type: 'integer' },
    description: { type: 'string' },
    mechanics: { type: 'array' },
    playTime: { type: 'integer' }
  }
});
module.exports = exports['default'];