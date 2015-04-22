/*global ENV */
import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import toastr from 'toastr';

class AddGame extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      hasAttemptedSubmission: false,
      validForm: false,
      validItems: {}
    };
  }

  isFormValid () {
    if (this.state.hasAttemptedSubmission) {
      let newState = {};
      if (this.state.validItems.bggId) {
        newState.validForm = true;
        this.setState(newState);
        return true;
      } else {
        let invalids = _.filter(this.state.validItems, (item) => {
          return !item;
        });
        if (invalids.length > 0) {
          newState.validForm = false;
          this.setState(newState);
          return false;
        }
      }
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    let newState = {
      hasAttemptedSubmission: true,
      validItems: {}
    };
    var requestObj = {};
    requestObj.owners = [];
    for (let key in this.refs) {
      if (key === 'available') {
        continue;
      }
      requestObj[key] = this.refs[key].getDOMNode().value;
      newState.validItems[key] = (requestObj[key] && requestObj[key].length > 0);
    }
    requestObj.owners.push({
      owner: ENV.user._id,
      available: this.refs.available.getDOMNode().checked
    });
    this.setState(newState, () => {
      if (this.isFormValid()) {
        this.context.flux.actions.games.createGame(requestObj, this.refs.addGameForm.getDOMNode());
      } else {
        if (!this.state.validItems.bggId) {
          toastr.error('If you don\'t provide a BGG ID, you must fill out all other fields.');
        }
      }
    });
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
                  <button type="submit" className="AddGame__SubmitButton btn btn-primary">Submit</button>
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
