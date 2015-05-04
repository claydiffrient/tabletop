/*globals Rollbar */
import axios from 'axios';

const VOTE_API_ENDPOINT = '/api/v1/votes/';

var VoteAPIUtils = {

  getAllVotes () {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .get(VOTE_API_ENDPOINT)
      .then((response) => {
        var votes = response.data;
        serverActions.receiveAllVotes(votes);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  getTodaysVotes () {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .get(VOTE_API_ENDPOINT, {
        params: { date: 'today'}
      })
      .then((response) => {
        var votes = response.data;
        serverActions.receiveTodaysVotes(votes);
      })
      .catch((response) => {
        Rollbar.error(response);
      });
  },

  sendVoteToServer (vote) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .post(VOTE_API_ENDPOINT, {
        date: vote.date,
        user: vote.userId,
        game: vote.gameId
      })
      .then((response) => {
        var vote = response.data;
        serverActions.voteCreatedSuccess(vote);
      })
      .catch((response) => {
        Rollbar.error(response);
        serverActions.voteCreatedFailure();
      });
  },

  deleteVote (voteId) {
    // Circular dependency
    let serverActions = require('../flux.jsx').actions.server;
    axios
      .delete(VOTE_API_ENDPOINT + voteId)
      .then((response) => {
        serverActions.voteDeletedSuccess(voteId);
      })
      .catch((response) => {
        Rollbar.error(response);
        serverActions.voteDeletedFailure();
      });
  }

};

export default VoteAPIUtils;
