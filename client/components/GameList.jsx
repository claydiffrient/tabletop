var React = require('react');
var Link = require('react-router').Link;
var GameStore = require('../stores/GameStore');
var Game = require('./Game.jsx');
var Filter = require('./Filter.jsx');

var GameList = React.createClass({
  displayName: 'GameList',

  getInitialState () {
    return GameStore.getState();
  },

  componentWillMount () {
    GameStore.addChangeListener(this.handleChange)
    GameStore.fetch();
  },

  componentDidMount () {
  },

  handleChange (newState) {
    this.setState(newState);
  },

  handleFilterChange (letter) {
    var lowercaseLetter = letter.toLowerCase();
    var uppercaseLetter = letter.toUpperCase();
    var newGames;
    if (lowercaseLetter === 'available') {
      newGames = GameStore.getState().games.filter((game) => {
        var isAvailable = false;
        game.owners.forEach((owner) => {
          if (owner.available) {
            isAvailable = true;
          }
        });
        return isAvailable;
      });
    }
    else if (lowercaseLetter === 'all') {
      newGames = GameStore.getState().games;
    }
    else {
      newGames = GameStore.getState().games.filter ( (game) => {
        return ((game.title.indexOf(lowercaseLetter) === 0) ||
                (game.title.indexOf(uppercaseLetter) === 0));
      });
    }
    this.setState({
      games: newGames
    });
  },

  renderGames () {
    if (this.state.loaded) {
      if (!this.state.games.length) {
        return (<h4>No games found.</h4>);
      }
      return this.state.games.map( (game) => {
        return (<Game
           key={game._id}
           id={game._id}
           bggId={game.bggId}
           description={game.description}
           numPlayers={game.numPlayers}
           playTime={game.playTime}
           thumbnailUrl={game.thumbnail}
           title={game.title}
           owners={game.owners} />);
      });
    } else {
      return null;
    }
  },

  render () {
    return (
      <div>
        <div className="GameList__Actions row center-xs">
          <Filter onChange={this.handleFilterChange} />
          <div className="GameList__Actions-AddGame-Container col-xs-2">
            <Link to="addGame" className="GameList__Actions-AddGame btn btn-primary">
              <i className="glyphicon glyphicon-plus" /> Add Game
            </Link>
          </div>
        </div>
        {this.renderGames()}
      </div>
    );
  }
});

module.exports = GameList;