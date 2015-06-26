var db = require('./db');

exports.up = function (next) {
  db.rpush('User', 'test', next);
};

exports.down = function (next) {
  db.rpop('User', 'test', next);
};
