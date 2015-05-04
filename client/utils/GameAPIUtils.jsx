/*globals Rollbar */
import axios from 'axios';

const GAME_API_ENDPOINT = '/api/v1/games/';

var GameAPIUtils = {

  getAllGames () {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .get(GAME_API_ENDPOINT)
      .then((response) => {
        var games = response.data;
        serverActions.receiveAllGames(games);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  createGame (gameRequest, form) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .post(GAME_API_ENDPOINT, gameRequest)
      .then((response) => {
        var game = response.data;
        serverActions.receiveCreatedGame(game, form);
      })
      .catch((response) => {
        // TODO: Better error handling.
        Rollbar.error(response);
        serverActions.handleFailedCreateGame(response);
      });
  },

  removeOwnerFromGame (gameOwnerObj) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    // Delete Url
    let delUrl = GAME_API_ENDPOINT + gameOwnerObj.game._id + '/owners/' + gameOwnerObj.ownerId;

    axios
      .delete(delUrl)
      .then((response) => {
        var updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  addOwnerToGame (gameOwnerObj) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    // Add Owner URL
    let addUrl = GAME_API_ENDPOINT + gameOwnerObj.game._id + '/owners/' + gameOwnerObj.ownerId;
    axios
      .post(addUrl)
      .then((response) => {
        var updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  setAvailability (gameOwnerObj, setTo) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    var updateObj = {
      available: setTo
    };

    let apiUrl = GAME_API_ENDPOINT + gameOwnerObj.game._id + '/owners/' + gameOwnerObj.ownerId;

    axios
      .put(apiUrl, updateObj)
      .then((response) => {
        var updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  updateGame (gameObj) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    axios
      .put(GAME_API_ENDPOINT + gameObj._id, gameObj)
      .then((response) => {
        let updatedGame = response.data;
        serverActions.recieveUpdatedGame(updatedGame);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  }

};

export default GameAPIUtils;
