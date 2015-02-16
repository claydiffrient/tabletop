var React = require('react');
var GameStore = require('../stores/GameStore');
var Game = require('./Game.jsx');

count = 0;

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
    console.log(this.props);
  },

  handleChange (newState) {
    console.log(newState);
    this.setState(newState);
  },

  renderGames () {
    if (this.state.loaded) {
      console.log(this.state.games)
      return this.state.games.map( (game) => {
        console.log('in map');
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
    console.log(count++)
    return (
      <div>
        <h2> Games </h2>
        {this.renderGames()}
      </div>
    );
  }
});

module.exports = GameList;