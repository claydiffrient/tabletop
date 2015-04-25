/*global ENV */
import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import toastr from 'toastr';
import forms from 'newforms';
import newformsBS from 'newforms-bootstrap';

let AddGameForm = forms.Form.extend({
  bggId: forms.IntegerField(),
  title: forms.CharField(),
  thumbnail: forms.URLField(),
  numPlayers: forms.CharField(),
  timeToPlay: forms.IntegerField(),
  description: forms.CharField({widget: forms.Textarea}),
  available: forms.BooleanField({required: false, widget: forms.CheckboxInput}),
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
    } else {
      if ((this.cleanedData.title) &&
         (this.cleanedData.thumbnail) &&
         (this.cleanedData.numPlayers) &&
         (this.cleanedData.timeToPlay) &&
         (this.cleanedData.description)) {
        this.errors().remove('bggId');
      }
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
    let form = this.refs.addGameForm.getForm();
    let isValid = form.validate();
    if (!isValid) { return;}
    let cleanedData = (form.cleanedData) ? form.cleanedData : null;

    var requestObj = {};
    requestObj.owners = [];
    for (let key in cleanedData) {
      if (key === 'available') {
        continue;
      }
      requestObj[key] = cleanedData[key];
    }
    requestObj.owners.push({
      owner: ENV.user._id,
      available: cleanedData.available
    });
    this.context.flux.actions.games.createGame(requestObj, this.refs.addGameForm.getForm());
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
