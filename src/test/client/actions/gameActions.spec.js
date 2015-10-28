import * as Actions from '../../../client/actions/gameActions';
import { expect } from 'chai';
import when from 'when';

describe('Game Actions', () => {

  describe('Action Creators', () => {
    it('creates a GOT_GAMES action on gotGames', () => {
      let actual = Actions.gotGames('test')
      let expected = {
        type: Actions.GOT_GAMES,
        payload: 'test'
      }
      expect(actual).to.deep.equal(expected);
    });
  })

  describe('Async Actions', () => {
    let client;
    before(() => {
      client = {
        get () {
          return when({data: ['test']});
        }
      }
    });

    describe('fetchGames', () => {
      it('returns a function', () => {
        expect(Actions.fetchGames()).to.be.an('function');
      });

      it('dispatches gotGames after fetchGames', (done) => {
        let gotGamesAction = {
          type: Actions.GOT_GAMES,
          payload: ['test']
        };
        let fakeResponse = {data: ['test']};
        let getState = () => {};
        let dispatchFunc = (action) => {
          expect(action).to.deep.equal(gotGamesAction);
          done();
        };
        Actions.fetchGames(client)(dispatchFunc, getState);
      });

    });
  });
});