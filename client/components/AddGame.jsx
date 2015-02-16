var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');
var AddGame = React.createClass({
  displayName: 'AddGame',

  componentDidMount () {
  },

  handleSubmit (event) {
    event.preventDefault();
    console.log(event);
    return false;
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
            then most fields will be autopopulated in the system.
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
                  <input className="form-control" type="text" id="bggId" name="bggId" />
                </div>
              </div>
              <hr />
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="gameTitle">Game Title:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" id="gameTitle" name="gameTitle" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="gameThumbnail">Game Thumbnail:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" id="gameThumbnail" name="gameThumbnail" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="numPlayers">Number of Players:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" placeholder="Min-Max" type="text" id="numPlayers" name="numPlayers" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="playTime">Time to Play:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" id="playTime" name="playTime" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="description">Description:</label>
                </div>
                <div className="col-xs-4">
                  <textarea className="form-control" id="description" name="description" />
                </div>
              </div>
              <hr />
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="ownerName">Owner Name:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" id="ownerName" name="ownerName" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="ownerSlackId">Slack Id:</label>
                </div>
                <div className="col-xs-4">
                  <input className="form-control" type="text" id="ownerSlackId" name="ownerSlackId" />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="gameAvailable">Available:</label>
                </div>
                <div className="col-xs-4">
                  <input type="checkbox" className="form-control" id="gameAvailable" name="gameAvailable" />
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




