var expect = require('expect.js');
var supertest = require('supertest');
var config = require('config');
var app = require('../../../../server/app');
var nock = require('nock');

nock.enableNetConnect();

var fakeSplendor = {
  name: 'fakeSplendor',
  thumbnail: '//fakeSplendorImage.jpg',
  minPlayers: 2,
  maxPlayers: 4,
  playingTime: 30,
  description: 'Fake splendor is so fake'
};

describe('Games API', function () {
  before(function () {
  });

  after(function () {
  });

  it('creates a new game given a bggId', function (done) {
    var bgg = nock('http://bgg-json.azurewebsites.net/')
                .get('/thing/148228')
                .reply(200, fakeSplendor, {"Content-Type": "application/json"});
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

});