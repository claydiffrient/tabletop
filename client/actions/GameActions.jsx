import { Actions } from 'minimal-flux';
import GameAPIUtils from '../utils/GameAPIUtils';

export default class GameActions extends Actions {

  createGame(gameObj) {
    this.dispatch('createGame', gameObj);
    GameAPIUtils.createGame(gameObj);
  }

  noLongerOwn(game, ownerId) {
    this.dispatch('noLongerOwn', {game, ownerId});
    GameAPIUtils.removeOwnerFromGame({game, ownerId});
  }

}