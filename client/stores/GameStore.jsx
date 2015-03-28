import { Store } from 'minimal-flux';

export default class GameStore extends Store {

  constructor(actions) {
    this.setState({games: []});
    this.handleAction('server.receiveAllGames', this.handleReceiveAll);
    this.handleAction('server.receiveCreatedGame', this.handleReceiveCreatedGame);
  }

  handleReceiveAll(games) {
    this.addGames(games);
  }

  handleReceiveCreatedGame(game) {
    this.addGames([game]);
  }

  addGames(games) {
    let savedGames = this.getState().games;
    games = savedGames.concat(games);
    this.setState({ games });
  }

  getAllGames() {
    return this.state.games;
  }

}