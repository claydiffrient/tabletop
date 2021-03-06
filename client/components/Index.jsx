import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import VoteTable from './VoteTable';

var ENV = window.ENV || {};

class Index extends React.Component {
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
    this.setState(this.getStateFromStores());
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

  talleyVotes(votes) {
    return _.countBy(votes, (vote) => {
      return vote.game.title;
    });
  }

  render() {
    var votes = this.talleyVotes(this.state.votes);

    var voteBtnClasses = classNames('btn', 'btn-primary', {
      'Link--disabled': (this.state.user === ''),
      'disabled': (this.state.user === '')
    });

    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Current Votes</h2>
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-5">
            <VoteTable votes={votes} />
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-4">
            <Link className={voteBtnClasses} to="games">Go to the Game List</Link>
          </div>
        </div>
      </div>
    );
  }

}

Index.contextTypes = {
  flux: React.PropTypes.object
};

export default Index;
