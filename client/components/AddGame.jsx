/*global ENV */
import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import toastr from 'toastr';
import forms from 'newforms';
import newformsBS from 'newforms-bootstrap';

let AddGameForm = forms.Form.extend({
  bggId: forms.IntegerField({required: false}),
  title: forms.CharField(),
  thumbnail: forms.URLField(),
  numPlayers: forms.CharField(),
  timeToPlay: forms.IntegerField(),
  description: forms.CharField({widget: forms.Textarea}),
  available: forms.BooleanField({widget: forms.CheckboxInput}),
  clean () {
    let bggId = this.cleanedData.bggId;
    if (bggId) {
      this.errors().removeAll([
        'title',
        'thumbnail',
        'numPlayers',
        'timeToPlay',
        'description'
      ]);
    }
  }
});

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

  renderValidation (field) {
    if (this.state.hasAttemptedSubmission) {
      if (this.state.validItems[field]) {
        return (<span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>);
      } else {
        return (<span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>);
      }
    } else {
      return null;
    }
  }

  render () {
    return (
      <form className="AddGame__Form" onSubmit={this.handleSubmit}>
      <forms.RenderForm form={AddGameForm} ref="addGameForm"></forms.RenderForm>
        <div className="row center-xs">
          <div className="col-xs-2">
            <button type="submit" className="AddGame__SubmitButton btn btn-primary">Submit</button>
          </div>
          <div className="col-xs-2">
            <button type="reset" className="btn">Reset</button>
          </div>
        </div>
      </form>
    );
  }
}

AddGame.contextTypes = {
  flux: React.PropTypes.object
};

export default AddGame;
