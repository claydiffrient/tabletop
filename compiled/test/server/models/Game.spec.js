/*eslint-env node, mocha */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expectJs = require('expect.js');

var _expectJs2 = _interopRequireDefault(_expectJs);

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

var _sailsMemory = require('sails-memory');

var _sailsMemory2 = _interopRequireDefault(_sailsMemory);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

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
});