import { Actions } from 'minimal-flux';

export default class ServerActions extends Actions {

  receiveAllGames(games) {
    this.dispatch('receiveAllGames', games);
  }

  receiveAllVotes(votes) {
    this.dispatch('receiveAllVotes', votes);
  }

  receiveCreatedVote(vote) {
    this.dispatch('receiveCreatedVote', vote);
  }

  receiveCreatedGame(game) {
    this.dispatch('receiveCreatedGame', game);
  }

  receiveTodaysVotes(votes) {
    this.dispatch('receiveTodaysVotes', votes);
  }

  voteCreatedSuccess(vote) {
    this.dispatch('voteCreatedSuccess', vote);
  }

  voteCreatedFailure() {
    this.dispatch('voteCreatedFailure');
  }


}