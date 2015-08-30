'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _sailsMemory = require('sails-memory');

var _sailsMemory2 = _interopRequireDefault(_sailsMemory);

var _sailsPostgresql = require('sails-postgresql');

var _sailsPostgresql2 = _interopRequireDefault(_sailsPostgresql);

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var orm = new _waterline2['default']();

var connections = {
  'default': {
    adapter: _config2['default'].get('Database.defaultAdapter') || 'memory'
  }
};

if (_config2['default'].has('Database.psql')) {
  connections.psql = {
    adapter: 'psql',
    host: _config2['default'].get('Database.psql.host'),
    user: _config2['default'].get('Database.psql.user'),
    password: _config2['default'].get('Database.psql.password'),
    database: _config2['default'].get('Database.psql.database'),
    pool: false,
    ssl: false,
    schema: true
  };
}

var wlConfig = {
  adapters: {
    'memory': _sailsMemory2['default'],
    'psql': _sailsPostgresql2['default']
  },
  connections: connections
};

_fs2['default'].readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(function (file) {
  var model = require(_path2['default'].join(__dirname, file));
  orm.loadCollection(model);
});

exports['default'] = { waterline: orm, config: wlConfig };
module.exports = exports['default'];