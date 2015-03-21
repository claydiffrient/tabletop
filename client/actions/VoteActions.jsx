import { Actions } from 'minimal-flux';

export default class VoteActions extends Actions {

  createVote(date, gameId, userId) {
    this.dispatch('createVote', date, gameId, userId);
  }

}