import { Actions } from 'minimal-flux';

export default class VoteActions extends Actions {

  castVote(game) {
    this.dispatch('castVote', game);
  }

  undoVote(game) {
    this.dispatch('undoVote', game);
  }

}