import { Flux } from 'minimal-flux';
import GameActions from './actions/GameActions';
import VoteActions from './actions/VoteActions';
import GameStore from './stores/GameStore';
import VoteStore from './stores/VoteStore';

export default new Flux({
  actions: {
    Game: GameActions,
    Vote: VoteActions
  },
  stores: {
    gameStore: GameStore,
    voteStore: VoteStore
  }
});