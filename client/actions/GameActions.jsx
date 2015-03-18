import { Actions } from 'minimal-flux';

export default class VoteActions extends Actions {

  addGame(game) {
    this.dispatch('addGame', game);
  }

  updateAvailability(game) {
    this.dispatch('updateAvailability', game);
  }

}