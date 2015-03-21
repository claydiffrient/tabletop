import { Flux } from 'minimal-flux';

import ServerActions from './actions/ServerActions';
import VoteActions from './actions/VoteActions';
import GameActions from './actions/GameActions';


export default new Flux({

    actions: {
        server: ServerActions,
        votes: VoteActions,
        games: GameActions
    }

});