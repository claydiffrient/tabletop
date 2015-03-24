import flux from '../flux'
import axios from 'axios';
let serverActions = flux.actions.server;

const VOTE_API_ENDPOINT = '/api/v1/votes/';

var VoteAPIUtils = {

  getAllVotes () {
    axios
      .get(VOTE_API_ENDPOINT)
      .then( (response) => {
        var votes = response.data;
        serverActions.receiveAllVotes(votes);
      })
      .catch( (response) => {
        console.error(response);
      });
  },

  getTodaysVotes () {
    axios
      .get(VOTE_API_ENDPOINT, {
        params: { date: 'today'}
      })
      .then( (response) => {
        var votes = response.data;
        serverActions.receiveTodaysVotes(votes);
      })
      .catch( (response) => {
        console.error(response);
      });
  }

};

export default VoteAPIUtils;