/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var Contact = module.exports = React.createClass({

  statics: {
    fetchData: function(token, params, query) {
      return api.get(`/games/${params.id}`, token);
    }
  },

  render: function() {
    var game = this.props.data.game.game;
    return (
      <div className="Detail">
        <div className="Game">
          <h1 className="Heading Heading--alt">{game.name}</h1>
          <div className="Content padBox">
            <img className="GameImage" key={game.id} src={game.image}/>
            <div className="KVSet">
              <div className="KV">
                <div className="KV__Key">Name</div>
                <div className="KV__Value">{game.first}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});