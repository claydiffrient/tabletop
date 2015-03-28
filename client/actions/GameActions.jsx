import { Actions } from 'minimal-flux';
import GameAPIUtils from '../utils/GameAPIUtils';

export default class GameActions extends Actions {

  createGame(gameObj) {
    this.dispatch('createGame', gameObj);
    GameAPIUtils.createGame(gameObj);
  }

}