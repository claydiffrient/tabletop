import { Store } from 'minimal-flux';
import _ from 'lodash';

export default class GameStore extends Store {

  constructor (actions) {
    super(actions);
    this.setState({games: [], isLoading: false});
    this.handleAction('server.receiveAllGames', this.handleReceiveAll);
    this.handleAction('server.receiveCreatedGame', this.handleReceiveCreatedGame);
    this.handleAction('server.recieveUpdatedGame', this.handleRecieveUpdatedGame);
    this.handleAction('games.createGame', this.handleIsLoading);
    this.handleAction('server.handleFailedCreateGame', this.handleDoneLoading);
  }

  handleIsLoading () {
    this.setState({isLoading: true});
  }

  handleDoneLoading () {
    this.setState({isLoading: false});
  }

  handleReceiveAll (games) {
    this.addGames(games);
  }

  handleReceiveCreatedGame (game) {
    this.addGames([game]);
    this.setState({isLoading: false});
  }

  handleRecieveUpdatedGame (updatedGame) {
    let curGames = this.state.games;
    let index = _.findIndex(curGames, (game) => {
      return game._id === updatedGame._id;
    });
    if (index >= 0) {
      curGames[index] = updatedGame;
      this.setState({games: curGames});
    } else {
      // TODO: Better error handling.
      console.warn('Updated game not properly handled.');
    }
  }

  addGames (games) {
    let savedGames = this.getState().games;
    games = savedGames.concat(games);
    this.setState({ games });
  }

  getAllGames () {
    return _.sortBy(this.state.games, 'title');
  }

  getGameById (id) {
    if (this.state.games.length) {
      return _.find(this.state.games, (game) => {
        return game._id === id;
      });
    } else {
      // Sometimes a first render happens, so we'll just give
      // and empty object which causes less problems than undefined.
      return {};
    }
  }

  isLoading () {
    return this.state.isLoading;
  }
}
