/* eslint-env node, mocha */
import { expect } from 'chai';
import nock from 'nock';
import supertest from 'supertest';
import app from '../../../../server/app';

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
  });

  describe('POST routes', () => {
    it('should create a new game given a bggId', (done) => {
      nock('http://bgg-json.azurewebsites.net/')
        .get('/thing/148228')
        .reply(200, fakeSplendor, {'Content-Type': 'application/json'});
      supertest(app)
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
      supertest(app)
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
      supertest(app)
        .post('/api/v1/games')
        .send({bggId: 148228})
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function (err, res) {
          done(err);
        });
    });
  });
});
