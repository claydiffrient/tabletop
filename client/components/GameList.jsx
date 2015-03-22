import React from 'react';
import { Link } from 'react-router';

import Game from './Game';
import Filter from './Filter';

class GameList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state = this.getStateFromStores();
  }

  getStateFromStores() {
    let stores = this.context.flux.stores;
    return {
      games: stores.games.getAllGames(),
      votes: stores.votes.getTodaysVotes()
    };
  }

  setStateFromStores() {
    this.setState(this.getStateFromStores);
  }

  componentDidMount() {
    let stores = this.context.flux.stores;
    stores.games.addListener('change', this.onChange);
    stores.votes.addListener('change', this.onChange);
  }

  componentWillUnmount() {
    let stores = this.context.flux.stores;
    stores.games.removeListener('change', this.onChange);
    stores.votes.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(this.getStateFromStores());
  }

  renderGames() {
    if (!this.state.games.length) {
      return (<h4>No games found.</h4>);
    }
    return this.state.games.map( (game) => {
      return (
        <Game
          key={game._id}
          id={game._id}
          bggId={game.bggId}
          description={game.description}
          numPlayers={game.numPlayers}
          playTime={game.playTime}
          thumbnailUrl={game.thumbnail}
          title={game.title}
          owners={game.owners}
          votedFor={votedForThis} />
      );
    });
  }

  render () {
    return (
      <div>
        <div className="GameList__Actions row center-xs">
          <Filter onChange={this.handleFilterChange} />
          <div className="GameList__Actions-AddGame-Container col-xs-2">
            <Link to="index" className="GameList__Actions-AddGame btn btn-primary">
              <i className="glyphicon glyphicon-plus" /> Add Game
            </Link>
          </div>
        </div>
        {this.renderGames()}
      </div>
    );
  }

}

GameList.contextTypes = {
  flux: React.PropTypes.object
};

export default GameList;

/**********
ACTUAL RENDER METHOD SHOULD BE SOMETHING LIKE THIS:
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



var GameList = React.createClass({
  displayName: 'GameList',

  getInitialState () {
    return {
      games: GameStore.getState().games,
      loaded: GameStore.getState().loaded,
      userHasVoted: false,
      userVotedFor: false
    };
  },

  componentWillMount () {
    GameStore.addChangeListener(this.handleChange);
    GameStore.fetch();
    VoteStore.addChangeListener(this.handleVoteChange);
    VoteStore.fetch('today');
  },

  componentDidMount () {
  },

  handleChange (newState) {
    this.setState(newState);
  },

  handleVoteChange (newState) {
    var votesByUser = newState.votes.filter( (vote) => {
      return (vote.user._id === ENV.user._id);
    });

    if (votesByUser.length) {
      this.setState({
        userHasVoted: true,
        userVotedFor: vote.game._id
      });
    }
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

  ,

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

module.exports = GameList; */