var expect = require('expect.js');
var supertest = require('supertest');
var app = require('../../../server/app');
var passportMock = require('passport-mock')(require('passport'), [{"id": 1}]);

describe('Server Routing', function () {
  describe('Sign In Route', function () {
    it('should render the signin page', function (done) {
      supertest(app)
        .get('/signin')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw new Error(err);
          expect(res.text).to.match(/LoginPage__Container/)
          done();
        });
    });
  });
});