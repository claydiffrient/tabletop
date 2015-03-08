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

  describe('Root Route', function () {
    it('should render the signin page if not authenticated', function (done) {
      supertest(app)
        .get('/')
        .expect(302)
        .end(function (err, res) {
          if (err) throw new Error(err);
          expect(res.header['location']).to.match(/\/signin/)
          done();
        });
    });

    xit('should open up the vote list if authenticated', function (done) {
      // Haven't yet figured out how to get this mock to work.
      passportMock(app);

      supertest(app)
        .get('/login/test/1')
        .expect(200)
        .end(function (err, res) {
          console.log(res);
          if (err) throw new Error(err);
          supertest(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .end(function (err, res) {
              if (err) throw new Error(err);
              // console.log(res);
              expect(res.text).to.match(/Current Votes/)
              done();
            });

        })


    });
  });
});