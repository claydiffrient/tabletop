var React = require('react');
var GameStore = require('../stores/GameStore');

var OwnerRow = React.createClass({
  displayName: 'OwnerRow',

  propTypes: {
    game: React.PropTypes.object.isRequired,
    owner: React.PropTypes.object.isRequired,
    isEditing: React.PropTypes.bool
  },

  handleCheckboxChange () {
    var request = {
      ownerId: this.props.owner._id,
      gameId: this.props.game._id,
      available: !this.props.owner.available
    };

    GameStore.updateGameOwner(request);
  },

  handleAddOwner () {

  },

  render () {
    console.log('rendering');
    console.log(this.props.isEditing);
    if (this.props.isEditing) {
      return (
        <tr>
          <form onSubmit={this.handleAddOwner}>
            <td>
              <label htmlFor="nameInput" className="sr-only">Owner Name</label>
              <input type="text" name="nameInput" ref="nameInput" placeholder="Owner Name" />
            </td>
            <td>
              <label htmlFor="slackId" className="sr-only">Slack Name</label>
              <input type="text" name="slackId" ref="slackId" placeholder="Slack Name" />
            </td>
            <td>
              <input type="checkbox"  />
              <button type="submit" className="OwnerRow-Save btn btn-primary btn-xs" >
                <i className="glyphicon glyphicon-ok">
                  <span className="sr-only">Save Owner</span>
                </i>
              </button>
            </td>
          </form>
        </tr>
      );
    }
    console.log('not editing');
    return (
      <tr>
        <td>
          <a href="#">
            <i className="EditAvailability__DeleteIcon glyphicon glyphicon-minus-sign text-danger"></i>
            <span className="sr-only">
              Delete {this.props.owner.name}
            </span>
          </a>
           {this.props.owner.name}
        </td>
        <td>{this.props.owner.slackId}</td>
        <td>
          <input type="checkbox" ref="availableCheckbox"
                 defaultChecked={this.props.owner.available} onChange={this.handleCheckboxChange} />
        </td>
      </tr>
    );
  }
});

module.exports = OwnerRow;