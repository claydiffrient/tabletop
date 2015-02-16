var React = require('react');
var BarChart = require('react-chartjs').Bar;
var Link = require('react-router').Link;
var VoteStore = require('../stores/VoteStore');
var _ = require('lodash');

var Index = React.createClass({
  displayName: 'Index',

  propTypes: {
    games: React.PropTypes.arrayOf(React.PropTypes.string),
    votes: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  getInitialState () {
    return VoteStore.getState();
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

  render () {
    var votes = this.talleyVotes(this.state.votes);
    var gameTitles = _.keys(votes); // Not guaranteed to be in order
    console.log(votes);
    console.log(this.state.votes, gameTitles);
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

    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Current Votes</h2>
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-5">
            <BarChart data={chartData} />
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-4">
            <Link className="btn btn-primary" to="games">Vote</Link>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Index;