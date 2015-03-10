var expect = require('expect.js');
var supertest = require('supertest');
var config = require('config');
var app = require('../../../../server/app');
var nock = require('nock');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var async = require('async');
mockgoose(mongoose);

var Game = require('../../../../server/models/game');
var Vote = require('../../../../server/models/vote');

nock.enableNetConnect();



var testGameObjId = mongoose.Types.ObjectId();

describe('Votes API', function () {
  beforeEach(function (done) {
    mockgoose.reset();
    Game.create({
      _id: testGameObjId,
      title: "testGame",
      bggId: 11111,
      thumbnail: "//test.jpg",
      numPlayers: "2-4",
      playTime: 30,
      description: "It's just a test",
      __v: 0,
      owners: [ ]
    }, function (err, model) {
      done(err, model);
    });
  });

  afterEach(function () {
    mockgoose.reset();
  });

  it('should create a vote', function (done) {
    supertest(app)
      .post('/api/v1/votes')
      .send({
        date: new Date(),
        game: testGameObjId
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        done();
      });
  });

  it('should get votes for a given date');
  it('should get all votes for a given game');
  it('should get all votes');

});