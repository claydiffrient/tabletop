var React = require('react');
var BarChart = require('react-chartjs').Bar;
var Link = require('react-router').Link;
var GameStore = require('../stores/GameStore');


var Index = React.createClass({
  displayName: 'Index',

  propTypes: {
    games: React.PropTypes.arrayOf(React.PropTypes.string),
    votes: React.PropTypes.arrayOf(React.PropTypes.number)
  },

  getDefaultProps () {
    return {
      games: ['Roll for the Galaxy', 'Splendor'],
      votes: [5, 7]
    };
  },

  handleClick () {
    this.props.handleVoteClick();
  },

  render () {

    var chartData = {
      labels: this.props.games,
      datasets: [{
        label: "Votes",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: this.props.votes
      }]
    }

    return (
      <div>
        <h2>Current Votes</h2>
        <BarChart data={chartData} />
        <Link to="games">Vote</Link>
      </div>
    );
  }
});

module.exports = Index;