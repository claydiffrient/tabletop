import flux from '../flux'
import axios from 'axios';
let serverActions = flux.actions.server;

const GAME_API_ENDPOINT = '/api/v1/games/';

var GameAPIUtils = {

  getAllGames () {
    axios
      .get(GAME_API_ENDPOINT)
      .then( (response) => {
        var games = response.data;
        serverActions.receiveAllGames(games);
      })
      .catch( (response) => {
        console.error(response);
      });
  }

};

export default GameAPIUtils;