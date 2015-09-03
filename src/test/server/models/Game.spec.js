/* eslint-env node, mocha */
import expect from 'expect.js';
import Waterline from 'waterline';
import sailsMemoryAdapter from 'sails-memory';

describe('GameModel', () => {
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
    let gameModel = require('../../../server/models/Game.js');
    let userModel = require('../../../server/models/User.js');
    waterline.loadCollection(userModel);
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

  it('should be able to create a new game', () => {
    let Game = waterline.collections.game;

    let testGame = Game.create({
      bggId: 123,
      title: 'Game of Tests',
      thumbnailUrl: 'http://example.com/image.png',
      minPlayers: 1,
      maxPlayers: 10,
      description: 'A simple game for testing things',
      mechanics: ['Deck Building', 'Test Taking'],
      playTime: 2
    });

    testGame.then((game) => {
      expect(game.title).to.be('Game of Tests');
    });

  });

});
