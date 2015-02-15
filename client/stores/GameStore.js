
var axios = require('axios');

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

  fetch () {
    var url = this.apiUrl + 'games';
    axios.get(url, {
      headers: {'X-Access-Token': this.token}
    })
    .then((response) => {
      this._state.games = response.data;
      this._state.loaded = true;
    })
    .catch((response) => {
      this._state.games = [];
      this._state.loaded = false;
    });
  }

}

module.exports = GameStore;