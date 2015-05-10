import { Store } from 'minimal-flux';
import _ from 'lodash';

export default class UserStore extends Store {

  constructor (actions) {
    super(actions);
    this.setState({
      user: {
        ignoredGames: []
      }
    });
    this.handleAction('server.receiveIgnoredGames', this.handleRecieveIgnoredGames);
    this.handleAction('server.unIgnoreGame', this.handleUnIgnoreGame);
    this.handleAction('server.receiveIgnoredGame', this.handleRecieveIgnoredGame);
  }

  handleUnIgnoreGame (gameId, userId) {
    let currentlyIgnored = this.state.user.ignoredGames;
    _.remove(currentlyIgnored, (ignored) => {
      return (ignored === gameId);
    });
    this.setState({
      user: { ignoredGames: currentlyIgnored}
    });
  }

  handleRecieveIgnoredGames (games) {
    this.setState({
      user: { ignoredGames: games }
    });
  }

  handleRecieveIgnoredGame (game) {
    let ignored = this.state.user.ignoredGames;
    ignored.push(game);
    this.setState({
      user: { ignoredGames: ignored }
    });
  }

  getIgnoredGames () {
    return this.state.user.ignoredGames;
  }
}
