var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');

var EditAvailability = React.createClass({
  displayName: 'EditAvailability',

  mixins: [Router.Navigation, Router.State],

  statics: {
    willTransitionTo () {
      GameStore.fetch();
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

  renderCurrentOwners () {
    if (this.state.game && this.state.game.owners) {
      return this.state.game.owners.map( (owner) => {
        return (
          <tr>
            <td>
              <a href="#">
                <i className="EditAvailability__DeleteIcon glyphicon glyphicon-minus-sign text-danger"></i>
                <span className="sr-only">
                  Delete {owner.name}
                </span>
              </a>
               {owner.name}
            </td>
            <td>{owner.slackId}</td>
            <td>
              <input type="checkbox" defaultChecked={owner.available} />
            </td>
          </tr>
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
                    <a href="#">
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