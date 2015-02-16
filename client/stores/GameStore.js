
var axios = require('axios');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

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

  apiUrl: 'http://localhost:3000/v1/',
  token: 'test123',

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

  fetch () {
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
  }

}

module.exports = GameStore;