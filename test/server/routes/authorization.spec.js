var expect = require('expect.js');
var supertest = require('supertest');
var app = require('../../../server/app');

describe('Authentication Server Routing', function () {
  describe('Logout Route', function () {
    xit('should render the signin page', function (done) {
      supertest(app)
        .get('/auth/logout')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw new Error(err);
          expect(res.header['location']).to.match(/\//)
          done();
        });
    });
  });

});