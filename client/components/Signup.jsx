var React = require('react');

var Signup = React.createClass({
  displayName: 'Signup',

  componentDidMount () {
    console.log(this.props);
  },

  render () {
    return (
      <div>
        <a href="/auth/slack">Signup with Slack</button>
      </div>
    );
  }
});

module.exports = Signup;