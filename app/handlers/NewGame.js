var React = require('react');
var { Navigation } = require('react-router');

var NewContactForm = module.exports = React.createClass({

  mixins: [ Navigation ],

  handleSubmit: function(event) {
    event.preventDefault();
    var name = this.refs.first.getDOMNode().value;
    var image = this.refs.image.getDOMNode().value;
    this.transitionTo('createGame', {}, {first, image});
  },

  render: function() {
    return (
      <div className="Detail">
        <h1 className="Heading Heading--alt">New Game</h1>
        <div className="Content padBox">
          <form
            action="/createGame"
            onSubmit={this.handleSubmit}
          >
            <p><input ref="name" name="name" placeholder="Game Name"/></p>
            <p><input ref="image" name="image" placeholder="Game Image URL"/></p>
            <p><button type="submit">Add</button></p>
          </form>
        </div>
      </div>
    );
  }
});