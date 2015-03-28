import axios from 'axios';

const GAME_API_ENDPOINT = '/api/v1/games/';

var GameAPIUtils = {

  getAllGames () {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .get(GAME_API_ENDPOINT)
      .then( (response) => {
        var games = response.data;
        serverActions.receiveAllGames(games);
      })
      .catch( (response) => {
        console.error(response);
      });
  },

  createGame (gameRequest) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .post(GAME_API_ENDPOINT, gameRequest)
      .then( (response) => {
        var game = response.data;
        serverActions.receiveCreatedGame(game);
      })
      .catch( (response) => {
        //TODO: Better error handling.
        console.error(response);
      });
  }

};

export default GameAPIUtils;

//132531