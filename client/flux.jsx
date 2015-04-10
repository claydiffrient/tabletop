import { Flux } from 'minimal-flux';

import ServerActions from './actions/ServerActions';
import VoteActions from './actions/VoteActions';
import GameActions from './actions/GameActions';

import GameStore from './stores/GameStore';
import VoteStore from './stores/VoteStore';

export default new Flux({

    actions: {
        server: ServerActions,
        votes: VoteActions,
        games: GameActions
    },

    stores: {
      games: GameStore,
      votes: VoteStore
    }

});
