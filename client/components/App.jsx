var React = require('react');

var App = React.createClass({
  displayName: 'App',

  render () {
    return (
      <div>
        <h1>TableTop Game Selector</h1>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;