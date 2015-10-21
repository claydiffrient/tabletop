/* eslint-env node, mocha */
import { expect } from 'chai';
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
mockgoose(mongoose);

import UserModel from '../../../server/models/User';
mongoose.connect('mongodb://localhost/TestingDB-58');

let Game = UserModel(mongoose);

describe('UserModel', () => {
  beforeEach(() => {
    mockgoose.reset();
  });

  it('should be able to create a new user', (done) => {
    Game.create({
      username: 'tester2015',
      firstName: 'Test',
      lastName: 'McTester',
      email: 'tester2015@example.com',
      password: 'password12345'
    }, (err) => {
      expect(err).to.not.be.ok;
      done();
    });
  });
});
