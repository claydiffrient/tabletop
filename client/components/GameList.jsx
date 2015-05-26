/*globals ENV*/
import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import Fuse from 'fuse.js';
import UserAPIUtils from '../utils/UserAPIUtils';

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
      votes: stores.votes.getTodaysVotes(),
      user: {
        ignoredGames: stores.users.getIgnoredGames()
      }
    };
  }

  setStateFromStores () {
    this.setState(this.getStateFromStores());
  }

  componentWillMount () {
    if (ENV.user) {
      UserAPIUtils.getAllIgnoredGames({userId: ENV.user._id});
    }
  }

  componentDidMount () {
    let stores = this.context.flux.stores;
    stores.games.addListener('change', this.onChange);
    stores.votes.addListener('change', this.onChange);
    stores.users.addListener('change', this.onChange);
  }

  componentWillUnmount () {
    let stores = this.context.flux.stores;
    stores.games.removeListener('change', this.onChange);
    stores.votes.removeListener('change', this.onChange);
    stores.users.removeListener('change', this.onChange);
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
    let query = this.context.router.getCurrentQuery();
    this.setState(_.assign(storeChanges, {userVote}));
    this.fuse = new Fuse(this.state.games, FUSE_OPTIONS);
    if (query.filter) {
      this.handleFilterChange(query.filter, true);
    }
    if (query.search) {
      this.handleSearch(query.search);
    }

  }

  handleSearch (input) {
    let results;
    if (!input.length) {
      let GameStore = this.context.flux.stores.games;
      results = GameStore.getAllGames();
      this.context.router.transitionTo('games', {}, {});
    } else {
      results = this.fuse.search(input);
      this.context.router.transitionTo('games', {}, {
        search: input
      });
    }
    this.setState({ games: results });
  }

  handleFilterChange (letter, fromQuery) {
    if (!fromQuery && (this.state.currentFilter === letter)) {
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
    }, () => {
      if (!fromQuery) {
        this.context.router.transitionTo('games', {}, {
          filter: letter
        });
      }
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
      // Skip ignored games
      if (_.includes(this.state.user.ignoredGames, game._id)) {
        return null;
      }
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
          mechanics={game.mechanics}
          votedFor={votedFor}
          userHasVoted={userHasVoted} />
      );
    });
  }

  render () {
    return (
      <div>
        <div className="GameList__Actions row center-xs">
          <Filter onChange={this.handleFilterChange}
                  onSearchChange={this.handleSearch}
                  initialValue={this.context.router.getCurrentQuery().search}
          />
          {this.renderAddGameArea()}
        </div>
        {this.renderGames()}
      </div>
    );
  }

}

GameList.contextTypes = {
  flux: React.PropTypes.object,
  router: React.PropTypes.func
};

export default GameList;
