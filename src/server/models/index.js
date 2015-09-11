import memoryAdapter from 'sails-memory';
import psqlAdapter from 'sails-postgresql';
import Waterline from 'waterline';
import fs from 'fs';
import path from 'path';
import config from 'config';

let orm = new Waterline();

let connections = {
  'default': {
    adapter: config.get('Database.defaultAdapter') || 'memory'
  }
};

if (config.has('Database.psql')) {
  connections.psql = {
    adapter: 'psql',
    host: config.get('Database.psql.host'),
    user: config.get('Database.psql.user'),
    password: config.get('Database.psql.password'),
    database: config.get('Database.psql.database'),
    pool: false,
    ssl: false,
    schema: true
  };
}

let wlConfig = {
  adapters: {
    'memory': memoryAdapter,
    'psql': psqlAdapter
  },
  connections
};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) &&
           (file !== 'index.js') &&
           (file.indexOf('.map') === -1);
  })
  .forEach((file) => {
    var model = require(path.join(__dirname, file));
    orm.loadCollection(model);
  });

export default {waterline: orm, config: wlConfig};
