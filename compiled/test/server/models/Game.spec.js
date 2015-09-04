/* eslint-env node, mocha */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expectJs = require('expect.js');

var _expectJs2 = _interopRequireDefault(_expectJs);

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

var _sailsMemory = require('sails-memory');

var _sailsMemory2 = _interopRequireDefault(_sailsMemory);

describe('GameModel', function () {
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

  it('should be able to create a new game', function () {
    var Game = waterline.collections.game;

    var testGame = Game.create({
      bggId: 123,
      title: 'Game of Tests',
      thumbnailUrl: 'http://example.com/image.png',
      minPlayers: 1,
      maxPlayers: 10,
      description: 'A simple game for testing things',
      mechanics: ['Deck Building', 'Test Taking'],
      playTime: 2
    });

    testGame.then(function (game) {
      (0, _expectJs2['default'])(game.title).to.be('Game of Tests');
    });
  });

  xit('should be able to associate a user with the game', function () {
    var Game = waterline.collections.game;
    var User = waterline.collections.user;

    User.create({
      username: 'tester2015',
      firstName: 'Test',
      lastName: 'McTester',
      email: 'tester2015@example.com',
      password: 'password12345'
    }, function () {

      Game.create({
        bggId: 123,
        title: 'Game of Tests',
        thumbnailUrl: 'http://example.com/image.png',
        minPlayers: 1,
        maxPlayers: 10,
        description: 'A simple game for testing things',
        mechanics: ['Deck Building', 'Test Taking'],
        playTime: 2
      }, function () {
        Game.find(1).exec(function (err, game) {
          if (err) throw new Error(err);
          console.log(game);
          game.owners.add([1]);

          game.save(function (err2) {
            if (err) throw new Error(err2);
          });
        });
      });
    });
  });
});