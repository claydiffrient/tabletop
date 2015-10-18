/* eslint-env node, mocha */
/* eslint-env node, mocha */
import { expect } from 'chai';
import Game from '../../../server/models/Game';

describe('GameModel', () => {
  it('should be able to create a new game', () => {
    let testGame = new Game({
      bggId: 123,
      title: 'Game of Tests',
      thumbnailUrl: 'http://example.com/image.png',
      minPlayers: 1,
      maxPlayers: 10,
      description: 'A simple game for testing things',
      mechanics: ['Deck Building', 'Test Taking'],
      playTime: 2
    });

    expect(testGame.title).to.equal('Game of Tests');
  });
});
