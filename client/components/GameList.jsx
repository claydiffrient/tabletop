/*globals ENV*/
import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import Fuse from 'fuse.js';

import Game from './Game';
import Filter from './Filter';

const FUSE_OPTIONS = {
  caseSensitive: false,
  keys: ['title'],
  threshold: 0.4
};

class GameList extends React.Component {

  constructor (props, context) {
    super(props, context);
    // Setup the userVote state.
    let storeChanges = this.getStateFromStores();
    let userVote = _.find(storeChanges.votes, (vote) => {
      if (ENV.user) {
        return vote.user === ENV.user._id;
      }
    });
    let currentFilter = 'All';
    this.state = _.assign(storeChanges, { userVote, currentFilter});
    this.fuse = new Fuse(this.state.games, FUSE_OPTIONS);
    // Bindings
    this.onChange = this.onChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getStateFromStores () {
    let stores = this.context.flux.stores;
    return {
      games: stores.games.getAllGames(),
      votes: stores.votes.getTodaysVotes()
    };
  }

  setStateFromStores () {
    this.setState(this.getStateFromStores());
  }

  componentDidMount () {
    let stores = this.context.flux.stores;
    stores.games.addListener('change', this.onChange);
    stores.votes.addListener('change', this.onChange);
  }

  componentWillUnmount () {
    let stores = this.context.flux.stores;
    stores.games.removeListener('change', this.onChange);
    stores.votes.removeListener('change', this.onChange);
  }

  onChange () {
    // Handle the changes from the store.
    let storeChanges = this.getStateFromStores();
    // Setup the userVote state.
    let userVote = _.find(storeChanges.votes, (vote) => {
      if (ENV.user) {
        return (vote.user === ENV.user._id) || (vote.user._id === ENV.user._id);
      }
    });
    this.setState(_.assign(storeChanges, {userVote}));
    this.fuse = new Fuse(this.state.games, FUSE_OPTIONS);
  }

  handleSearch (input) {
    let results = this.fuse.search(input);
    this.setState({ games: results });
  }

  handleFilterChange (letter) {
    if (this.state.currentFilter === letter) {
      letter = 'all';
    }
    var GameStore = this.context.flux.stores.games;
    var lowercaseLetter = letter.toLowerCase();
    var newGames;
    if (lowercaseLetter === 'available') {
      newGames = GameStore.getAllGames().filter((game) => {
        var isAvailable = false;
        game.owners.forEach((owner) => {
          if (owner.available) {
            isAvailable = true;
          }
        });
        return isAvailable;
      });
    } else if (lowercaseLetter === 'all') {
      newGames = GameStore.getAllGames();
    } else {
      newGames = GameStore.getAllGames().filter((game) => {
        let lowercaseTitle = game.title.toLowerCase();
        let titleWords = lowercaseTitle.split(' ');
        if (titleWords[0] === 'the') {
          return (titleWords[1].indexOf(lowercaseLetter) === 0);
        }
        return (lowercaseTitle.indexOf(lowercaseLetter) === 0);
      });
    }
    this.setState({
      games: newGames,
      currentFilter: letter
    });
  }

  renderAddGameArea () {
    if (!ENV.user) {
      return null;
    } else {
      return (
        <div className="GameList__Actions-AddGame-Container col-xs-2">
          <Link to="addGame" className="GameList__Actions-AddGame btn btn-primary">
            <i className="glyphicon glyphicon-plus" /> Add Game
          </Link>
        </div>
      );
    }
  }

  renderGames () {
    if (!this.state.games.length) {
      return (<h4>No games found.</h4>);
    }
    return this.state.games.map((game) => {
      let votedFor = false;
      let userHasVoted = false || !!this.state.userVote;
      if (this.state.userVote && this.state.userVote.game._id === game._id) {
        votedFor = this.state.userVote;
      }

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
          votedFor={votedFor}
          userHasVoted={userHasVoted} />
      );
    });
  }

  render () {
    return (
      <div>
        <div className="GameList__Actions row center-xs">
          <Filter onChange={this.handleFilterChange} onSearchChange={this.handleSearch} />
          {this.renderAddGameArea()}
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
