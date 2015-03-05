var expect = require('expect.js');
var supertest = require('supertest');
var config = require('config');
var DatabaseCleaner = require('database-cleaner');
var dbCleaner = new DatabaseCleaner('mongodb');
var mongoose = require('mongoose');
var app = require('../../../../server/app');

describe('Games API', function () {

  if (config.util.getEnv('NODE_ENV') != 'test') {
    throw new Error('You are not running in the test environment.');
  }

  afterEach(function (done) {
    dbCleaner.clean(mongoose.connection.db, done);
  });

  it('creates a new game given a bggId', function (done) {
    supertest(app)
      .post('/api/v1/games')
      .send({
        bggId: 148228
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err.stack);
        console.log();
        expect(res.body.title).to.be('Splendor');
        done();
      });
  });

});