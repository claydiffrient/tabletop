/*global ENV */
import React from 'react';
import Router from 'react-router';

class AddGame extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();

    var requestObj = {};
    requestObj.owners = [];
    for (let key in this.refs) {
      if (key === 'available') {
        continue;
      }
      requestObj[key] = this.refs[key].getDOMNode().value;
    }
    requestObj.owners.push({
      owner: ENV.user._id,
      available: this.refs.available.getDOMNode().checked
    });
    this.context.flux.actions.games.createGame(requestObj, this.refs.addGameForm.getDOMNode());
  }

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
            <form ref="addGameForm" className="AddGame__Form" onSubmit={this.handleSubmit}>
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
                  <label htmlFor="available">At my desk: </label>
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
}

AddGame.contextTypes = {
  flux: React.PropTypes.object
};

export default AddGame;
