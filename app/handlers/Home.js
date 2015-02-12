/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var Home = module.exports = React.createClass({
  render: function() {
    return (
      <div className="Detail">
        <h1 className="Heading Heading--alt">Welcome!</h1>
        <div className="Content padBox">
          <p>This app is rendered on the server and the client with React</p>
        </div>
      </div>
    );
  }
});