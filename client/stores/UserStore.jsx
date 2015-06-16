import { Store } from 'minimal-flux';
import _ from 'lodash';

export default class UserStore extends Store {

  constructor (actions) {
    super(actions);
    this.setState({
      user: {
        ignoredGames: [],
        authorizedAccounts: []
      }
    });
    this.handleAction('server.receiveIgnoredGames', this.handleRecieveIgnoredGames);
    this.handleAction('server.unIgnoreGame', this.handleUnIgnoreGame);
    this.handleAction('server.receiveIgnoredGame', this.handleRecieveIgnoredGame);
    this.handleAction('server.recieveAuthorizedAccounts', this.handlRecieveAuthorizedAccounts);
  }

  handleUnIgnoreGame (gameId, userId) {
    let currentlyIgnored = this.state.user.ignoredGames;
    _.remove(currentlyIgnored, (ignored) => {
      return (ignored === gameId);
    });
    this.setState({
      user: {
        ignoredGames: currentlyIgnored,
        authorizedAccounts: this.state.authorizedAccounts
      }
    });
  }

  handleRecieveIgnoredGames (games) {
    this.setState({
      user: {
        ignoredGames: games,
        authorizedAccounts: this.state.authorizedAccounts
      }
    });
  }

  handlRecieveAuthorizedAccounts (accounts) {
    this.setState({
      user: {
        authorizedAccounts: accounts,
        ignoredGames: this.state.user.ignoredGames
      }
    });
  }

  handleRecieveIgnoredGame (game) {
    let ignored = this.state.user.ignoredGames;
    ignored.push(game);
    this.setState({
      user: {
        ignoredGames: ignored,
        authorizedAccounts: this.state.authorizedAccounts
      }
    });
  }

  getIgnoredGames () {
    return this.state.user.ignoredGames;
  }

  getAuthorizedAccounts () {
    return this.state.user.authorizedAccounts;
  }
}
