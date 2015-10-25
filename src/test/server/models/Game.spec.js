/* eslint-env node, mocha */
import { expect } from 'chai';
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
mockgoose(mongoose);

import GameModel from '../../../server/models/Game';
mongoose.connect('mongodb://localhost/TestingDB-58');

let Game = GameModel(mongoose);

describe('GameModel', () => {
  beforeEach(() => {
    mockgoose.reset();
  });

  after(() => {
    mockgoose.reset();
  });

  it('should be able to create a new game', (done) => {
    Game.create({
      bggId: 123,
      title: 'Game of Tests',
      thumbnailUrl: 'http://example.com/image.png',
      minPlayers: 1,
      maxPlayers: 10,
      description: 'A simple game for testing things',
      mechanics: ['Deck Building', 'Test Taking'],
      playTime: 2
    }, (err) => {
      expect(err).to.not.be.ok;
      done();
    });
  });

  it('should not allow multiple games with the same BGG ID', (done) => {
    Game.create({
      bggId: 1,
      title: 'Test 1'
    }, (err, game1) => {
      Game.create({
        bggId: 1,
        title: 'Test 2'
      }, (err2, game2) => {
        expect(err).to.not.be.ok;
        expect(err2).to.be.ok;
        expect(err2.name).to.equal('ValidationError');
        done();
      });
    });
  });

  it('should not allow multiple games with the same title', (done) => {
    Game.create({
      bggId: 1,
      title: 'Test 1'
    }, (err, game1) => {
      Game.create({
        bggId: 2,
        title: 'Test 1'
      }, (err2, game2) => {
        expect(err).to.not.be.ok;
        expect(err2).to.be.ok;
        expect(err2.name).to.equal('ValidationError');
        done();
      });
    });
  });
});
