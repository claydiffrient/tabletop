import { Actions } from 'minimal-flux';
import UserAPIUtils from '../utils/UserAPIUtils';

export default class UserActions extends Actions {

  ignoreGame (gameId, userId) {
    this.dispatch('ignoreGame', gameId, userId);
    UserAPIUtils.sendIgnoreGameToServer({gameId, userId});
  }

  unIgnoreGame (gameId, userId) {
    this.dispatch('unIgnoreGame', gameId, userId);
    UserAPIUtils.unIgnoreGameOnServer({gameId, userId});
  }

}
