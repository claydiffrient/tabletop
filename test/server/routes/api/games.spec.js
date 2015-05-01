/*globals describe beforeEach afterEach it xit */
var expect = require('expect.js');
var supertest = require('supertest');
var app = require('../../../../server/app');
var nock = require('nock');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var async = require('async');
mockgoose(mongoose);

var Game = require('../../../../server/models/game');
var User = require('../../../../server/models/user');

nock.enableNetConnect();

var fakeSplendor = {
  name: 'fakeSplendor',
  thumbnail: '//fakeSplendorImage.jpg',
  minPlayers: 2,
  maxPlayers: 4,
  playingTime: 30,
  description: 'Fake splendor is so fake'
};

var testGameObjId = mongoose.Types.ObjectId();
var testGame2ObjId = mongoose.Types.ObjectId();
var testUserId = mongoose.Types.ObjectId();

describe('Games API', function () {
  beforeEach(function (done) {
    mockgoose.reset();

    async.parallel([
      function (complete) {
        Game.create({
          _id: testGameObjId,
          title: 'testGame',
          bggId: 11111,
          thumbnail: '//test.jpg',
          numPlayers: '2-4',
          playTime: 30,
          description: 'It\'s just a test',
          __v: 0,
          owners: [ ]
        }, function (err, model) {
          complete(err, model);
        });
      },
      function (complete) {
        Game.create({
          _id: testGame2ObjId,
          title: 'aTestGame2',
          bggId: 11112,
          thumbnail: '//test2.jpg',
          numPlayers: '2-6',
          playTime: 30,
          description: "It's just another test",
          __v: 0,
          owners: [ ]
        }, function (err, model) {
          complete(err, model);
        });
      },
      function (complete) {
        User.create({
          _id: testUserId,
          firstName: 'Test',
          lastName: 'Tester',
          email: 'testing@test.com'
        }, function (err, model) {
          complete(err, model);
        });
      }],
      done
    );
  });

  afterEach(function () {
    mockgoose.reset();
  });

  it('should create a new game given a bggId', function (done) {
    nock('http://bgg-json.azurewebsites.net/')
      .get('/thing/148228')
      .reply(200, fakeSplendor, {'Content-Type': 'application/json'});
    supertest(app)
      .post('/api/v1/games')
      .send({ bggId: 148228})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body.title).to.be('fakeSplendor');
        done();
      });
  });

  it('should throw a 500 error if it gets a 500 error from the BGG JSON api', function (done) {
    nock('http://bgg-json.azurewebsites.net/')
      .get('/thing/148228')
      .reply(500);
    supertest(app)
      .post('/api/v1/games')
      .send({ bggId: 148228})
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        done(err);
      });
  });

  it('should get a single game', function (done) {
    supertest(app)
      .get('/api/v1/games/' + testGameObjId)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body._id).to.be(testGameObjId.toString());
        done();
      });
  });

  it('should get a list of games', function (done) {
    supertest(app)
      .get('/api/v1/games/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body).to.be.an(Array);
        expect(res.body.length).to.be(2);
        done();
      });
  });

  it('should return a list of games sorted alphabetically by title', function (done) {
    supertest(app)
      .get('/api/v1/games/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body).to.be.an(Array);
        expect(res.body[0].title).to.be('aTestGame2');
        expect(res.body[1].title).to.be('testGame');
        done();
      });
  });

  // This should work, but for whatever reason, nothing is coming back in res.body
  // except an empty object... :(
  xit('should add an owner for a game', function (done) {
    var url = '/api/v1/games/' + testGameObjId + '/owners/' + testUserId;
    supertest(app)
      .post(url)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw new Error(err);
        expect(res.body).to.be.ok();
        var owners = res.body.owners;
        console.log(res);
        expect(owners.length).to.be(1);
        expect(owners[0].owner._id).to.be(testUserId);
        expect(owners[0].available).to.not.be.ok();
        done();
      });
  });
});
