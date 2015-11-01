/** @flow */
/* eslint-env node, mocha */
import { expect } from 'chai';
import config from 'config';
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
mockgoose(mongoose);

mongoose.connect(config.get('Db.url'));
require('../../../server/models')();

let Vote = mongoose.model('Vote');

describe('VoteModel', () => {
  beforeEach(() => {
    mockgoose.reset();
  });

  after(() => {
    mockgoose.reset();
  });

  it('should be able to create a new Vote', (done) => {
    let gameId = mongoose.Types.ObjectId();
    let userId = mongoose.Types.ObjectId();
    Vote.create({
      date: new Date(),
      game: gameId,
      user: userId
    }, (err, vote) => {
      expect(err).to.not.be.ok;
      expect(vote.date).to.be.ok;
      expect(vote.game).to.be.ok;
      expect(vote.user).to.be.ok;
      done();
    });
  });

  it('should be able to create a new Vote with a default date', (done) => {
    let gameId = mongoose.Types.ObjectId();
    let userId = mongoose.Types.ObjectId();
    Vote.create({
      game: gameId,
      user: userId
    }, (err, vote) => {
      expect(err).to.not.be.ok;
      expect(vote.date).to.be.ok;
      expect(vote.game).to.be.ok;
      expect(vote.user).to.be.ok;
      done();
    });
  });
});