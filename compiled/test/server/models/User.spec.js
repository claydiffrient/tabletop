/* eslint-env node, mocha */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expectJs = require('expect.js');

var _expectJs2 = _interopRequireDefault(_expectJs);

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

var _sailsMemory = require('sails-memory');

var _sailsMemory2 = _interopRequireDefault(_sailsMemory);

describe('UserModel', function () {
  var waterline = new _waterline2['default']();
  var config = {
    adapters: {
      'memory': _sailsMemory2['default']
    },
    connections: {
      'default': {
        adapter: 'memory'
      }
    }
  };

  before(function (done) {
    var gameModel = require('../../../server/models/Game.js');
    var userModel = require('../../../server/models/User.js');
    waterline.loadCollection(userModel);
    waterline.loadCollection(gameModel);
    waterline.initialize(config, function (err, collections) {
      if (err) return done(err);
      done();
    });
  });

  after(function () {
    var adapters = config.adapters || {};
    var promises = [];

    Object.keys(adapters).forEach(function (adapter) {
      if (adapters[adapter].teardown) {
        var promise = new Promise(function (resolve) {
          adapters[adapter].teardown(null, resolve);
        });
        promises.push(promise);
      }
    });
    return Promise.all(promises);
  });

  it('should be able to create a new user', function () {
    var User = waterline.collections.user;

    var testUser = User.create({
      username: 'tester2015',
      firstName: 'Test',
      lastName: 'McTester',
      email: 'tester2015@example.com',
      password: 'password12345'
    });

    testUser.then(function (user) {
      (0, _expectJs2['default'])(user.firstName).to.be('Test');
    });
  });
});