var React = require('react');

var GameList = React.createClass({
  displayName: 'GameList',

  componentDidMount () {
    console.log(this.props);
  },

  render () {
    return (
      <div>
        List of Games
      </div>
    );
  }
});

module.exports = GameList;