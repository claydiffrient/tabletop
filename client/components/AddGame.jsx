var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');
var AddGame = React.createClass({
  displayName: 'AddGame',

  mixins: [Router.Navigation],

  componentDidMount () {
  },

  handleSubmit (event) {
    event.preventDefault();
    var requestObj = {};
    requestObj.owners = [];
    var ownerObj = {}
    for (key in this.refs) {
      if ((key === 'name') || (key === 'slackId') || (key === 'available' )) {
        var value = this.refs[key].getDOMNode().value;
        if (key === 'available') {
          value = this.refs[key].getDOMNode().checked;
        }
        ownerObj[key] = value;
        continue;
      }
      requestObj[key] = this.refs[key].getDOMNode().value;
    }
    requestObj.owners.push(ownerObj);
    GameStore.addNewGame(requestObj);
    this.transitionTo('games');
  },

  render () {
    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Add A Game</h2>
          </div>
        </div>
        <div className="AddGame__Instructions row">
          <div className="col-xs-12 alert alert-info">
            You can fill out everything, but if you include a BoardGameGeek Id
            then the second set of fields will be overriden by the data from
            BoardGameGeek.com
          </div>
        </div>
        <div className="AddGame__Form-Container row center-xs">
          <div className="col-xs-10">
            <form className="AddGame__Form" onSubmit={this.handleSubmit}>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="bggId">BGG Id:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" ref="bggId" id="bggId" name="bggId" />
                </div>
              </div>
              <hr />
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="title">Game Title:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" ref="title" id="title" name="title" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="thumbnail">Game Thumbnail:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" ref="thumbnail" id="thumbnail" name="thumbnail" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="numPlayers">Number of Players:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" placeholder="Min-Max" type="text" ref="numPlayers" id="numPlayers" name="numPlayers" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="playTime">Time to Play:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" ref="playTime" id="playTime" name="playTime" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="description">Description:</label>
                </div>
                <div className="col-xs-4">
                  <textarea className="form-control" ref="description" id="description" name="description" />
                </div>
              </div>
              <hr />
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="name">Owner Name:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" ref="name" id="name" name="name" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="slackId">Slack Id:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" ref="slackId" id="slackId" name="slackId" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="available">Available:</label>
                </div>
                <div className="col-xs-4">
                  <input type="checkbox" className="form-control" ref="available" id="available" name="available" />
                </div>
              </div>
              <hr />
              <div className="row center-xs">
                <div className="col-xs-2">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="col-xs-2">
                  <button type="reset" className="btn">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddGame;



