/* eslint-env node, mocha */
import { expect } from 'chai';
import nock from 'nock';
import supertest from 'supertest';
import app from '../../../../server/app';
import createServer from '../../../../server/createServer';
import mockgoose from 'mockgoose';
// import Game from '../../../../server/models/Game';
import mongoose from 'mongoose';
import { parallel } from 'async';

mockgoose(mongoose);
var server;

describe('Game Routes', () => {
  let fakeSplendor = {
    name: 'fakeSplendor',
    thumbnail: '//fakeSplendorImage.jpg',
    minPlayers: 2,
    maxPlayers: 4,
    playingTime: 30,
    description: 'Fake splendor is so fake',
    mechanics: [
      'Set Collection'
    ]
  };

  beforeEach(() => {
    server = createServer(app);
  });

  afterEach((done) => {
    server.close(done);
  })

  describe('POST', () => {
    after(() => {
      mockgoose.reset();
    })

    it('should create a new game given a bggId', (done) => {
      nock('http://bgg-json.azurewebsites.net/')
        .get('/thing/148228')
        .reply(200, fakeSplendor, {'Content-Type': 'application/json'});
      supertest(server)
        .post('/api/v1/games')
        .send({bggId: 148228})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw new Error(err);
          expect(res.body.title).to.equal('fakeSplendor');
          done();
        });
    });

    it('should throw a 400 error without a BGG Id', (done) => {
      nock('http://bgg-json.azurewebsites.net/')
        .get('/thing/148228')
        .reply(200, fakeSplendor, {'Content-Type': 'application/json'});
      supertest(server)
        .post('/api/v1/games')
        .send({title: 'A Title'})
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) {}
          done();
        });
    });

    it('should throw a 500 error if it gets a 500 error from the BGG JSON api', function (done) {
      nock('http://bgg-json.azurewebsites.net/')
        .get('/thing/148228')
        .reply(500);
      supertest(server)
        .post('/api/v1/games')
        .send({bggId: 148228})
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function (err, res) {
          done(err);
        });
    });
  });

  describe('GET routes', () => {
    let Game = mongoose.model('Game');
    let testGameObjId = mongoose.Types.ObjectId();
    let testGameObj = {
      _id: testGameObjId,
      bggId: 1,
      title: 'Game of Tests 1',
      thumbnailUrl: 'http://example.com/image.png',
      minPlayers: 1,
      maxPlayers: 10,
      description: 'A simple game for testing things',
      mechanics: ['Deck Building', 'Test Taking'],
      playTime: 2
    };
    before((done) => {
      parallel([
        (callback) => {
          Game.create(testGameObj, callback);
        },
        (callback) => {
          Game.create({
            bggId: 2,
            title: 'Game of Tests 2',
            thumbnailUrl: 'http://example.com/image.png',
            minPlayers: 1,
            maxPlayers: 10,
            description: 'A simple game for testing things',
            mechanics: ['Deck Building', 'Test Taking'],
            playTime: 2
          }, callback);
        },
        (callback) => {
          Game.create({
            bggId: 3,
            title: 'Game of Tests 3',
            thumbnailUrl: 'http://example.com/image.png',
            minPlayers: 1,
            maxPlayers: 10,
            description: 'A simple game for testing things',
            mechanics: ['Deck Building', 'Test Taking'],
            playTime: 2
          }, callback);
        }
      ], () => {
        done();
      });
    });


    it('should list all games when requesting the root route', (done) => {
      supertest(server)
        .get('/api/v1/games/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          done(err);
        });
    });

    it('should list a single game when requesting by id', (done) => {
      supertest(server)
        .get(`/api/v1/games/${testGameObjId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal(testGameObj.title);
          done(err);
        });
    });
  });
});
