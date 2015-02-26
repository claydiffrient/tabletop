var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');
var OwnerRow = require('./OwnerRow.jsx');

var EditAvailability = React.createClass({
  displayName: 'EditAvailability',

  mixins: [Router.Navigation, Router.State],

  statics: {
    willTransitionTo () {
      GameStore.fetch(true);
    }
  },

  getInitialState () {
    return {game: {}}
  },

  componentWillMount () {
    GameStore.addChangeListener( () => {
      var params = this.getParams();
      var game = GameStore.get(params.id);
      this.setState({
        game: game
      });
    });
  },

  handleAddNewOwner () {
    var newGame = this.state.game;
    newGame.owners.push({isNew: true})
    this.setState({
      game: newGame
    });
  },

  renderCurrentOwners () {
    if (this.state.game && this.state.game.owners) {
      return this.state.game.owners.map( (owner) => {
        console.log(owner);
        return (
          <OwnerRow key={owner._id} owner={owner} game={this.state.game} isEditing={owner.isNew}/>
        );

      });
    } else {
      return null;
    }
  },

  render () {
    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Modify Availability</h2>
          </div>
        </div>
        <div className="EditAvailability__Form-Container row left-xs">
          <div className="col-xs-10">
            <h3>{this.state.game.title}</h3>
            <hr />
            <table className="AvailabilityTable table table-striped table-bordered table-hover"
                   summary="This table shows the current game owners.">
              <thead>
                <tr>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Slack Name</th>
                  <th scope="col">Available</th>
                </tr>
              </thead>
              <tbody>
                {this.renderCurrentOwners()}
                <tr>
                  <td colSpan="3">
                    <a href="#" onClick={this.handleAddNewOwner}>
                      <i className="glyphicon glyphicon-plus-sign text-success"></i>
                      Add a new owner
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EditAvailability;