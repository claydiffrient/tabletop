import { Actions } from 'minimal-flux';

export default class ServerActions extends Actions {

  recieveAllGames(games) {
    this.dispatch('recieveAllGames', games);
  }

  recieveAllVotes(votes) {
    this.dispatch('recieveAllVotes', votes);
  }

  recieveCreatedVote(vote) {
    this.dispatch('recieveCreatedVote', vote);
  }

  recieveTodaysVotes(votes) {
    this.dispatch('recieveTodaysVotes', votes);
  }

}