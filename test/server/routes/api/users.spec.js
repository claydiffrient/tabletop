/*eslint-env node, mocha */
var expect = require('expect.js');
var supertest = require('supertest');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var async = require('async');
mockgoose(mongoose);

var app = require('../../../../server/app');
var User = require('../../../../server/models/user');
var Game = require('../../../../server/models/game');

var testGameObjId = mongoose.Types.ObjectId();
var testGame2ObjId = mongoose.Types.ObjectId();
var testUserId = mongoose.Types.ObjectId();

describe('Users API', function () {
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

  describe('Ignored Games', function () {
    it('ignores a given game', function (done) {
      var url = '/api/v1/users/' + testUserId + '/ignoredgames';
      supertest(app)
        .put(url)
        .send({ignore: testGameObjId})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw new Error(err);
          expect(res.body).to.be.ok();
          expect(res.body.ok).to.be.ok();
          expect(res.body.ignore).to.be(testGameObjId.toString());
          done();
        });
    });

    it('returns a list of ignored games', function (done) {
      // Bit of setup for this one.
      User.findById(testUserId, function (err, user) {
        if (err) {
          throw new Error(err);
        }
        user.ignoredGames.push(testGameObjId);
        user.ignoredGames.push(testGame2ObjId);

        user.save(function (err) {
          if (err) {
            throw new Error(err);
          }
          // Actual test starts here :)
          var url = '/api/v1/users/' + testUserId + '/ignoredgames';
          supertest(app)
            .get(url)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) throw new Error(err);
              expect(res.body).to.be.ok();
              expect(res.body).to.be.an(Array);
              expect(res.body.length).to.be(2);
              expect(res.body).to.eql([testGameObjId.toString(), testGame2ObjId.toString()]);
              done();
            });
        });
      });
    });
  });
});
