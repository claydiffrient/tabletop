var React = require('react');

var NotFound = React.createClass({
  displayName: 'NotFound',

  componentDidMount () {
    console.log(this.props);
  },

  render () {
    return (
      <div>
        404 Not Found
      </div>
    );
  }
});

module.exports = NotFound;