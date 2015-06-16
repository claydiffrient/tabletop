import { Actions } from 'minimal-flux';
import toastr from 'toastr';

export default class ServerActions extends Actions {

  receiveAllGames (games) {
    this.dispatch('receiveAllGames', games);
  }

  receiveAllVotes (votes) {
    this.dispatch('receiveAllVotes', votes);
  }

  receiveCreatedVote (vote) {
    this.dispatch('receiveCreatedVote', vote);
  }

  receiveCreatedGame (game, form) {
    this.dispatch('receiveCreatedGame', game);
    toastr.success('Game created successfully');
    form.reset();
  }

  handleFailedCreateGame (response) {
    this.dispatch('handleFailedCreateGame', response);
    toastr.error('Game not created');
  }

  recieveUpdatedGame (game) {
    this.dispatch('recieveUpdatedGame', game);
    toastr.success('Game updated');
  }

  receiveTodaysVotes (votes) {
    this.dispatch('receiveTodaysVotes', votes);
  }

  voteCreatedSuccess (vote) {
    this.dispatch('voteCreatedSuccess', vote);
  }

  voteCreatedFailure () {
    this.dispatch('voteCreatedFailure');
  }

  voteDeletedSuccess (voteId) {
    this.dispatch('voteDeletedSuccess', voteId);
  }

  voteDeletedFailure () {
    this.dispatch('voteDeletedFailure');
  }

  receiveIgnoredGames (ignoredGames) {
    this.dispatch('receiveIgnoredGames', ignoredGames);
  }

  receiveIgnoredGame (ignoredGame) {
    this.dispatch('receiveIgnoredGame', ignoredGame);
  }

  unIgnoreGame (ignoredObject) {
    this.dispatch('unIgnoreGame', ignoredObject.gameId, ignoredObject.userId);
  }

  recieveAuthorizedAccounts (accounts) {
    this.dispatch('recieveAuthorizedAccounts', accounts);
  }

}
