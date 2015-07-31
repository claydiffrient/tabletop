/* eslint-env mocha */
var expect = require('expect.js');
var supertest = require('supertest');
var app = require('../../../../server/app');
var nock = require('nock');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var async = require('async');
var moment = require('moment');
mockgoose(mongoose);

var Game = require('../../../../server/models/game');
var Vote = require('../../../../server/models/vote');
var User = require('../../../../server/models/user');

nock.enableNetConnect();

var testGameObjId = mongoose.Types.ObjectId();
var testGameObjIdTwo = mongoose.Types.ObjectId();
var testUserObjId = mongoose.Types.ObjectId();
var voteIdOne = mongoose.Types.ObjectId();
var voteIdTwo = mongoose.Types.ObjectId();
var voteIdThree = mongoose.Types.ObjectId();
var voteIdFour = mongoose.Types.ObjectId();

describe('Votes API', function () {
  beforeEach(function (done) {
    mockgoose.reset();

    // Create games
    async.parallel([
      function (complete) {
        // Create the first game.
        Game.create({
          _id: testGameObjId,
          title: 'testGame',
          bggId: 11111,
          thumbnail: '//test.jpg',
          numPlayers: '2-4',
          playTime: 30,
          description: "It's just a test",
          __v: 0,
          owners: [ ]
        }, function (err, model) {
          complete(err, model);
        });
      },
      function (complete) {
        User.create({
          _id: testUserObjId,
          username: 'testUser'
        }, function (err, model) {
          complete(err, model);
        });
      },
      function (complete) {
        // Create the second game
        Game.create({
          _id: testGameObjIdTwo,
          title: 'testGame2',
          bggId: 11112,
          thumbnail: '//test.jpg',
          numPlayers: '2-4',
          playTime: 30,
          description: "It's just another test",
          __v: 0,
          owners: [ ]
        }, function (err, model) {
          complete(err, model);
        });
      }],
      function (err, results) {
        if (err) done(err);
        // Create votes
        async.parallel([
          function (complete) {
            // Add a vote from today into the database
            Vote.create({
              _id: voteIdOne,
              date: new Date(),
              game: testGameObjId
            }, function (err, model) {
              complete(err);
            });
          },
          function (complete) {
            // Add another vote from today into the database
            Vote.create({
              _id: voteIdTwo,
              date: new Date(),
              game: testGameObjId
            }, function (err, model) {
              complete(err);
            });
          },
          function (complete) {
            // Add a vote from yesterday into the database
            var yesterday = moment().subtract(1, 'days');
            Vote.create({
              _id: voteIdThree,
              date: yesterday,
              game: testGameObjId
            }, function (err, model) {
              complete(err);
            });
          },
          function (complete) {
            // Add a vote for a different game to the database.
            Vote.create({
              _id: voteIdFour,
              date: new Date(),
              game: testGameObjIdTwo
            }, function (err, model) {
              complete(err);
            });
          }
        ],
        function (err, result) {
          done(err, result);
        });
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
        game: testGameObjId,
        user: testUserObjId
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        done();
      });
  });

  it('should reduce the available votes of a user when voting', function (done) {
    supertest(app)
      .post('/api/v1/votes')
      .send({
        date: new Date(),
        game: testGameObjId,
        user: testUserObjId
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body.user.availableVotes).to.be(9);
        done();
      });
  });

  it('should get votes for a given date', function (done) {
    var yesterday = moment().subtract(1, 'days');
    yesterday = yesterday.format('YYYY-MM-DD');
    supertest(app)
        .get('/api/v1/votes?date=' + yesterday)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw new Error(err);
          expect(res.body.length).to.be(1);
          done();
        });
  });

  it('shoudl get all votes for today', function (done) {
    supertest(app)
      .get('/api/v1/votes?date=today')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body.length).to.be(3);
        done();
      });
  });

  it('should get all votes for a given game', function (done) {
    supertest(app)
      .get('/api/v1/votes?game=' + testGameObjIdTwo)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body.length).to.be(1);
        expect(res.body[0]._id).to.be(voteIdFour.toString());
        done();
      });
  });

  it('should get all votes', function (done) {
    supertest(app)
      .get('/api/v1/votes')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body.length).to.be(4);
        done();
      });
  });

});
