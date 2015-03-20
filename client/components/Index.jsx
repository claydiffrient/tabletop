import React from 'react';
// TODO: Fix when react-router supports 0.13
import { Link } from 'react-router/build/npm';
import classNames from 'classnames';
import _ from 'lodash';

// var VoteStore = require('../stores/VoteStore');
// var VoteTable = require('./VoteTable.jsx');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // votes: VoteStore.getState(),
      user: ENV.user
    };
  }

  componentWillMount() {
    // VoteStore.addChangeListener(this.handleChange);
    // VoteStore.fetch('today');
  }

  talleyVotes(votes) {
    return _.countBy(votes, (vote) => {
      return vote.game.title;
    });
  }

  handleChange(newState) {
    console.log('handleChange Called');
    this.setState(newState);
  }

  handleClick() {
    this.props.handleVoteClick();
  }

  renderAuthButton() {
    var props = {};
    if (this.state.user === '') {
      props.href = '/auth/slack';
      props.innerText = "Sign In With Slack";
    } else {
      props.href = '/auth/logout';
      props.innerText = "Logout";
    }
    return (
      <div className="LoginButton__Row row center-xs middle-xs">
        <div className="col-xs-6">
          <div className="LoginButton__Container">
            <a href={props.href} className="LoginButton btn btn-primary">
              <img className="LoginButton__Logo" src="/images/slack_sticker.png" />
              {props.innerText}
            </a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // var votes = this.talleyVotes(this.state.votes.votes);

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

          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-4">
            <Link className={voteBtnClasses} to="index">Vote</Link>
          </div>
        </div>
        {this.renderAuthButton()}
      </div>
    );
  }

}

Index.propTypes = {
    games: React.PropTypes.arrayOf(React.PropTypes.string),
    votes: React.PropTypes.arrayOf(React.PropTypes.number)
};
