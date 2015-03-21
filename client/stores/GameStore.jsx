import { Store } from 'minimal-flux';

export default class GameStore extends Store {

  constructor(actions) {
    this.setState({games: []});
    this.handleAction('server.receiveAllGames', this.handleReceiveAll);
  }

  handleReceiveAll(games) {
    this.addGames(games);
  }

  addGames(games) {
    let { savedGames } = this.getState();
    games = savedGames.concat(games);
    this.setState({ games });
  }

  getAllGames() {
    return this.state.games;
  }

}