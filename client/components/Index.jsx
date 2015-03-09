var React = require('react');
var BarChart = require('react-chartjs').Bar;
var Link = require('react-router').Link;
var classNames = require('classnames');
var VoteStore = require('../stores/VoteStore');
var VoteTable = require('./VoteTable.jsx');
var _ = require('lodash');

var Index = React.createClass({
  displayName: 'Index',

  propTypes: {
    games: React.PropTypes.arrayOf(React.PropTypes.string),
    votes: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  getInitialState () {
    return {
      votes: VoteStore.getState(),
      user: ENV.user
    }
  },

  componentWillMount () {
    VoteStore.addChangeListener(this.handleChange);
    VoteStore.fetch('today');
  },

  talleyVotes (votes) {
    return _.countBy(votes, (vote) => {
      return vote.game.title;
    });
  },

  handleChange (newState) {
    console.log('handleChange Called');
    this.setState(newState);
  },

  handleClick () {
    this.props.handleVoteClick();
  },

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
  },

  render () {
    var votes = this.talleyVotes(this.state.votes.votes);
    var gameTitles = _.keys(votes); // Not guaranteed to be in order
    // console.log(votes);
    // console.log(this.state.votes.votes, gameTitles);
    var chartData = {
      labels: gameTitles,
      datasets: [{
        label: "Votes",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: _.values(votes) // Not guaranteed to be in order
      }]
    }

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
            <Link className={voteBtnClasses} to="games">Vote</Link>
          </div>
        </div>
        {this.renderAuthButton()}
      </div>
    );
  }
});

module.exports = Index;