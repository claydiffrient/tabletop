import { Store } from 'minimal-flux';

export default class UserStore extends Store {

  constructor (actions) {
    super(actions);
    this.setState({
      user: {
        ignoredGames: []
      }
    });
    this.handleAction('server.receiveIgnoredGames', this.handleRecieveIgnoredGames);
  }

  handleRecieveIgnoredGames (games) {
    let ignoredGames = this.getState().user.ignoredGames;
    games = ignoredGames.concat(games);
    this.setState({
      user: {
        ignoredGames: games
      }
    });
  }

  getIgnoredGames () {
    return this.state.user.ignoredGames;
  }
}
