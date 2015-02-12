/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');
var cache = require('../utils/cache');

var CreateGame = module.exports = React.createClass({

  statics: {
    willTransitionTo: (transition, params, query) => {
      var url = '/games';
      var token = CreateGame.token;
      transition.wait(
        api.post(url, {game: query}, token).then(function(data) {
          cache.expire(token, url);
          transition.redirect(`/game/${data.game.id}`);
        })
      );
    }
  },

  render: function() {
    return null;
  }

});