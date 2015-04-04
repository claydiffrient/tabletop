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

    // Delete Url
    let delUrl = GAME_API_ENDPOINT + gameOwnerObj.game._id + '/owners/' +  gameOwnerObj.ownerId;

    axios
      .delete(delUrl)
      .then( (response) => {
        var updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch( (response) => {
        console.error(response);
      });

  },

  addOwnerToGame (gameOwnerObj) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    // Add Owner URL
    let addUrl = GAME_API_ENDPOINT + gameOwnerObj.game._id + '/owners/' +  gameOwnerObj.ownerId;
    axios
      .post(addUrl)
      .then( (response) => {
        var updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch( (response) => {
        console.error(response);
      });
  },


  setAvailability (gameOwnerObj, setTo) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    // Find the proper owner and update it.
    // var updatedOwners = gameOwnerObj.game.owners;
    // var owner = _.find(updatedOwners, (owner) => {
    //   return owner.owner._id === gameOwnerObj.ownerId
    // });
    // owner.available = setTo;
    // let updateObj = {
    //   owners: updatedOwners.map( (own) => {
    //     return {
    //       owner: own.owner._id,
    //       available: own.available
    //     };
    //   })
    // };
    //

    var updateObj = {
      available: setTo
    };

    let apiUrl = GAME_API_ENDPOINT + gameOwnerObj.game._id + '/owners/' + gameOwnerObj.ownerId;

    axios
      .put(apiUrl, updateObj)
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