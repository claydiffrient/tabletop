
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;
var config = require('./config');
var emitter = new EventEmitter();
var _ = require('lodash');

var fixDescriptionEntities = function (data) {
  data.forEach( (game, index) => {
    newDesc = game.description
                  .replace(/&#10;/g, '\n')
                  .replace(/&mdash;/g, '—')
                  .replace(/&quot;/g, '"');
    data[index].description = newDesc;
  });

  return data;
};

var GameStore = {

  apiUrl: config.apiUrl,
  token: config.accessToken,

  _state: {
    games: [],
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

  fetch (force) {
    if (this._state.loaded && !force) {
      return;
    }
    var url = this.apiUrl + 'games';
    axios.get(url, {
      headers: {'X-Access-Token': this.token}
    })
    .then((response) => {
      response.data = fixDescriptionEntities(response.data);
      this._state.games = response.data;
      this._state.loaded = true;
      emitter.emit('change', this._state);
    })
    .catch((response) => {
      this._state.games = [];
      this._state.loaded = false;
    });
  },

  get (id) {
    if (this._state.loaded) {
      return _.find(this._state.games, '_id', id);
    } //else {
      // return new Error('Store not loaded.');
    // }
  },

  addNewGame (request) {
    var url = this.apiUrl + 'games';

    axios.post(url, request, {
      headers: {'X-Access-Token': this.token}
    })
    .then((response) => {
      this._state.games.push(response.data);
      this._state.loaded = true;
      emitter.emit('change', this._state);
    })
    .catch((response) => {
      console.log(response.errors);
    });
  },

  updateGame (request) {
    var url = this.apiUrl + 'games/' + request._id;

    axios.put(url, request, {
      headers: {'X-Access-Token': this.token}
    })
    .then((response) => {
      var gameIndex = _.findIndex(this._state.games, {'_id': request._id});
      this._state.games[gameIndex] = response.data;
      emitter.emit('change', this._state);
    })
    .catch((response) => {
      console.log(response.errors);
    });
  }

}

module.exports = GameStore;