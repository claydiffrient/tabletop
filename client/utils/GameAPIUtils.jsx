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
  },

  removeOwnerFromGame (gameOwnerObj) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    // Remove the owner from the array of owners.
    let newOwners = gameOwnerObj.game.owners;
    _.remove(newOwners, (owner) => {
      owner._id === gameOwnerObj.ownerId
    });
    let updateObj = {
      owners: newOwners
    }
    axios
      .put(GAME_API_ENDPOINT + gameOwnerObj.game._id, updateObj)
      .then( (response) => {
        var updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch( (response) => {
        console.error(response);
      });

  }

};

export default GameAPIUtils;

//132531