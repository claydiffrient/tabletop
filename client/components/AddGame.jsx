/*global ENV */
import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import toastr from 'toastr';
import forms from 'newforms';
import newformsBS from 'newforms-bootstrap';
const { Container, Row, Field } = newformsBS;

let AddGameForm = forms.Form.extend({
  bggId: forms.IntegerField({
    label: 'BoardGameGeek ID',
    helpText: 'If provided this will pull data from BoardGameGeek.com',
    cssClass: 'row center-xs'
  }),
  title: forms.CharField(),
  thumbnail: forms.URLField(),
  numPlayers: forms.CharField({
    label: 'Number of Players',
    widgetAttrs: {placeholder: 'Min-Max'}
  }),
  timeToPlay: forms.IntegerField({
    label: 'Time to Play'
  }),
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
      formValid: false
    };
  }

  handleSubmit (event) {
    event.preventDefault();
    let form = this.refs.addGameForm.getForm();
    let isValid = form.validate();
    if (!isValid) {
      this.setState({formValid: false});
      return;
    } else {
      this.setState({formValid: true});
    }
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

  handleFormChange () {
    let form = this.refs.addGameForm.getForm();
    let length = _.keys(form.errors().errors).length;
    if (length) {
      this.setState({formValid: false});
    } else {
      this.setState({formValid: true});
    }
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
            then all other fields will be overriden by the data from
            BoardGameGeek.com
          </div>
        </div>
        <div className="AddGame__Form-Container row center-xs">
          <div className="col-xs-10">
            <form className="AddGame__Form" onSubmit={this.handleSubmit}>
              <forms.RenderForm form={AddGameForm} ref="addGameForm" onChange={this.handleFormChange.bind(this)}>
                <Container className="AddGame__FormFieldContainer">
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="bggId" />
                  </Row>
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="title" />
                  </Row>
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="thumbnail" />
                  </Row>
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="numPlayers" />
                  </Row>
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="timeToPlay" />
                  </Row>
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="description" />
                  </Row>
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="available" />
                  </Row>
                </Container>
              </forms.RenderForm>

              <div className="row center-xs">
                <div className="col-xs-2">
                  <button type="submit" ref="submitBtn" disabled={!this.state.formValid} className="AddGame__SubmitButton btn btn-primary">Submit</button>
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
