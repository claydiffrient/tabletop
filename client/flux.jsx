import { Flux } from 'minimal-flux';

import ServerActions from './actions/ServerActions';
import VoteActions from './actions/VoteActions';
import GameActions from './actions/GameActions';
import UserActions from './actions/UserActions';

import GameStore from './stores/GameStore';
import VoteStore from './stores/VoteStore';
import UserStore from './stores/UserStore';

export default new Flux({
    actions: {
      server: ServerActions,
      votes: VoteActions,
      games: GameActions,
      users: UserActions
    },
    stores: {
      games: GameStore,
      votes: VoteStore,
      users: UserStore
    }
});
