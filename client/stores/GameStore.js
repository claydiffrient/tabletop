
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;
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
    var url = '/api/v1/games';
    axios.get(url)
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
    var url = '/api/v1/games';

    axios.post(url, request)
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
    var url = '/api/v1/games/' + request._id;

    axios.put(url, request)
    .then((response) => {
      var gameIndex = _.findIndex(this._state.games, {'_id': request._id});
      this._state.games[gameIndex] = response.data;
      emitter.emit('change', this._state);
    })
    .catch((response) => {
      console.log(response.errors);
    });
  },

  updateGameOwner (request) {
    var url = '/api/v1/games/' + request.gameId + '/owners/' + request.ownerId;

    // Don't need these moving forward.
    delete request.gameId;
    delete request.ownerId;

    axios.put(url, request)
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