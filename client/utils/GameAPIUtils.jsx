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
    var newOwners = gameOwnerObj.game.owners;
    var removed = _.remove(newOwners, (owner) => {
      debugger;
      owner.owner._id === gameOwnerObj.ownerId
    });
    console.log('removed', removed);
    console.log(newOwners);
    let updateObj = {
      owners: newOwners.map( (own) => {
        return {
          owner: own.owner._id,
          available: own.available
        }
      })
    }
    axios
      .put(GAME_API_ENDPOINT + gameOwnerObj.game._id, updateObj)
      .then( (response) => {
        var updatedGame = response.data;
        console.log('data', updatedGame);
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch( (response) => {
        console.error(response);
      });

  },

  addOwnerToGame (gameOwnerObj) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    let updateObj = {
      owners: [{
        owner: gameOwnerObj.ownerId,
        // We'll set this to false by default because owned != available.
        available: false
      }]
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