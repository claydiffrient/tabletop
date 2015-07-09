var MongoClient = require('mongodb').MongoClient;
var config = require('config');

var dbPromise = MongoClient.connect(config.get('Db.url'));

module.exports = dbPromise;
