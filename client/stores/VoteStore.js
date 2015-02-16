
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

var VoteStore = {

  apiUrl: 'http://localhost:3000/v1/',
  token: 'test123',

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
    var url = this.apiUrl + 'votes';
    if (date) {
      console.log(date);
      url += '?date=' + date;
    }
    axios.get(url, {
      headers: {'X-Access-Token': this.token}
    })
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

  submitVote (request) {
    var url = this.apiUrl + 'votes';

    axios.post(url, request, {
      headers: {'X-Access-Token': this.token}
    })
    .then((response) => {
      this._state.votes.push(response.data);
      this._state.loaded = true;
      emitter.emit('change', this._state);
    })
    .catch((response) => {
      console.log(response.errors);
    });

  }

}

module.exports = VoteStore;