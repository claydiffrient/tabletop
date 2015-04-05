import { Actions } from 'minimal-flux';
import GameAPIUtils from '../utils/GameAPIUtils';

export default class GameActions extends Actions {

  createGame(gameObj) {
    this.dispatch('createGame', gameObj);
    GameAPIUtils.createGame(gameObj);
  }

  updateGame(gameObj) {
    this.dispatch('updateGame', gameObj);
    GameAPIUtils.updateGame(gameObj);
  }

  noLongerOwn(game, ownerId) {
    this.dispatch('noLongerOwn', {game, ownerId});
    GameAPIUtils.removeOwnerFromGame({game, ownerId});
  }

  iOwnIt(game, ownerId) {
    this.dispatch('iOwnIt', {game, ownerId});
    GameAPIUtils.addOwnerToGame({game, ownerId});
  }

  nowAvailable(game, ownerId) {
    this.dispatch('nowAvailable', {game, ownerId});
    GameAPIUtils.setAvailability({game, ownerId}, true);
  }

  notAvailableNow(game, ownerId) {
    this.dispatch('notAvailableNow', {game, ownerId});
    GameAPIUtils.setAvailability({game, ownerId}, false);
  }

}