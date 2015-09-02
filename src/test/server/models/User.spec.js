/* eslint-env node, mocha */
import expect from 'expect.js';
import Waterline from 'waterline';
import sailsMemoryAdapter from 'sails-memory';

describe('UserModel', () => {
  let waterline = new Waterline();
  let config = {
    adapters: {
      'memory': sailsMemoryAdapter
    },
    connections: {
      default: {
        adapter: 'memory'
      }
    }
  };

  before((done) => {
    let gameModel = require('../../../server/models/User.js');
    waterline.loadCollection(gameModel);
    waterline.initialize(config, (err, collections) => {
      if (err) return done(err);
      done();
    });
  });

  after(() => {
    let adapters = config.adapters || {};
    let promises = [];

    Object.keys(adapters)
          .forEach((adapter) => {
            if (adapters[adapter].teardown) {
              let promise = new Promise((resolve) => {
                adapters[adapter].teardown(null, resolve);
              });
              promises.push(promise);
            }
          });
    return Promise.all(promises);
  });

  it('should be able to create a new user', () => {
    let User = waterline.collections.user;

    let testUser = User.create({
      username: 'tester2015',
      firstName: 'Test',
      lastName: 'McTester',
      email: 'tester2015@example.com',
      password: 'password12345'
    });

    testUser.then((user) => {
      expect(user.firstName).to.be('Test');
    });

  });

});
