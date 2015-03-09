
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

var VoteStore = {

  _state: {
    votes: [],
    loaded: false
  },

  getState () {
    return this._state;
  },

  addChangeListener (handler) {
    emitter.addListener('change', handler);
  },

  removeChangeListener (hander) {
    emitter.removeListener('change', handler);
  },

  fetch (date) {
    var url = '/api/v1/votes';
    if (date) {
      console.log(date);
      url += '?date=' + date;
    }
    axios.get(url)
    .then((response) => {
      console.log(response.data);
      this._state.votes = response.data;
      this._state.loaded = true;
      emitter.emit('change', this._state);
    })
    .catch((response) => {
      this._state.votes = [];
      this._state.loaded = false;
    });
  },

  submitVote (request, afterVoteHandler) {
    var url = '/api/v1/votes';

    axios.post(url, request)
    .then((response) => {
      this._state.votes.push(response.data);
      this._state.loaded = true;
      emitter.emit('change', this._state);
      afterVoteHandler(request.game);
    })
    .catch((response) => {
      console.log(response.errors);
    });

  }

}

module.exports = VoteStore;