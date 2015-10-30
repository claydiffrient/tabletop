import rootReducer from '../../../client/reducers';
import * as Actions from '../../../client/actions/gameActions';
import { expect } from 'chai';

describe('Reducer Tests', () => {
  describe('games reducer', () => {
    it('adds game payload to the state on GOT_GAMES', () => {
      let initialState = {
        gameList: {
          games: [1,2,3]
        }
      };

      let action = Actions.gotGames([4,5,6]);

      let finalState = rootReducer(initialState, action);

      expect(finalState.gameList.games).to.deep.equal([1,2,3,4,5,6]);
    })
  })
});