/*globals Rollbar */
import axios from 'axios';

const USER_API_URL = '/api/v1/users/';

var UserAPIUtils = {

  sendIgnoreGameToServer (options) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;

    axios
      .put(USER_API_URL + options.userId + '/ignoredgames', {
        ignore: options.gameId
      })
      .then((response) => {
        let ignored = response.data.ignore;
        serverActions.receiveIgnoredGame(ignored);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  getAllIgnoredGames (options) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .get(USER_API_URL + options.userId + '/ignoredgames')
      .then((response) => {
        let ignoredGames = response.data;
        serverActions.receiveIgnoredGames(ignoredGames);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  unIgnoreGameOnServer (options) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .delete(USER_API_URL + options.userId + '/ignoredgames/' + options.gameId)
      .then((response) => {
        serverActions.unIgnoreGame(options);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  getAuthorizedAccounts (options) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .get(USER_API_URL + options.userId + '/accounts')
      .then((response) => {
        let accounts = response.data;
        serverActions.recieveAuthorizedAccounts(accounts);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  }
};

export default UserAPIUtils;
