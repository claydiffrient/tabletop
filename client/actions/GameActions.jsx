import { Actions } from 'minimal-flux';

export default class GameActions extends Actions {

  createGame(gameObj) {
    this.dispatch('createGame', gameObj);
  }

}