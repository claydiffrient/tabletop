/* eslint-env node, mocha */
import { expect } from 'chai';
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
mockgoose(mongoose);

import UserModel from '../../../server/models/User';
mongoose.connect('mongodb://localhost/TestingDB-58');

let User = UserModel(mongoose);

describe('UserModel', () => {
  beforeEach(() => {
    mockgoose.reset();
  });

  after(() => {
    mockgoose.reset();
  })

  it('should be able to create a new user', (done) => {
    User.create({
      username: 'tester2015',
      firstName: 'Test',
      lastName: 'McTester',
      email: 'tester2015@example.com',
      password: 'password12345'
    }, (err, user) => {
      expect(err).to.not.be.ok;
      expect(user.username).to.equal('tester2015');
      done();
    });
  });

  it('should not store the password in plain text', (done) => {
    let unencrypted = 'password12345';
    User.create({
      username: 'tester2015',
      firstName: 'Test',
      lastName: 'McTester',
      email: 'tester2015@example.com',
      password: unencrypted
    }, (err, user) => {
      expect(err).to.not.be.ok;
      expect(user.password).to.not.equal(unencrypted);
      done();
    });
  });
});
