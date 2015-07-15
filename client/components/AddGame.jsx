/*global ENV */
import React from 'react';
import Router from 'react-router';
import _ from 'lodash';
import toastr from 'toastr';
import forms from 'newforms';
import newformsBS from 'newforms-bootstrap';
// import Select from 'react-select';
import axios from 'axios';
import { Combobox } from 'react-pick';
import cookie from 'cookie-dough';
const { Container, Row, Field } = newformsBS;
import UserAPIUtils from '../utils/UserAPIUtils';

const SPINNER = 'data:image/gif;base64,R0lGODlhDgAOANU%2FAJ2rtf39%2FfL09a65wvX2993i5qq2v9Ta35CgrLjCyuTo6%2Bfq7aGvub3Hzs7V2vX3%2BI6eq9rf47rEzOvu8NLZ3ens7u7w8sDJ0ODl6MfP1aazvYqbqNDX3Pr7%2FLW%2Fx4iZpomap%2BPn6vHz9Y2dqqSxu%2FT19%2Bjr7tfd4dvg5KOwuvj5%2BeLm6ae0vd%2Fk5%2Fj5%2BvHz9Nbc4Nbc4Y2dqff4%2Bebp7NXb3%2FDy9Iqbp%2BXp7Pv8%2FL%2FIz%2Fn6%2B7nDy%2FDy84%2Bfq%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FwtYTVAgRGF0YVhNUDw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzA4MjZFM0EyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzA4MjZFNEEyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyI%2BIDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NDkzOTlDQTJBOTExRTNCMTY5RDA1RDUzNkFDQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI3MDgyNkUyQTJFQTExRTNCMTY5RDA1RDUzNkFDQzY3Ii8%2BIDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY%2BIDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8%2BAf%2F%2B%2Ffz7%2Bvn49%2Fb19PPy8fDv7u3s6%2Brp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M%2FOzczLysnIx8bFxMPCwcC%2Fvr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ%2BenZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8%2BPTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQMAPwAsAAAAAA4ADgAABhTAn3BILBqPyKRyyWw6n9CodGoMAgAh%2BQQFAwA%2FACwHAAAAAQADAAAGBcCOrRMEACH5BAUDAD8ALAcAAAABAAMAAAYFwNKhFAQAIfkEBQMAPwAsBwAAAAEAAwAABgXABQkXBAAh%2BQQFAwA%2FACwHAAAAAgADAAAGB8DQ7FOLPYIAIfkEBQMAPwAsBwAAAAMAAwAABgrAX%2Bn3%2B0xOmV8QACH5BAUDAD8ALAcAAAAEAAMAAAYLQMxvOCSJfjpNIAgAIfkEBQMAPwAsBwAAAAUABAAABg%2FA0G9I%2FCmGDR%2BoMiRQfkEAIfkEBQMAPwAsBwAAAAYABQAABhNAzG9IHIaGNcnQQXwwPotm7RcEACH5BAUDAD8ALAcAAAAHAAYAAAYVwNVvSCwSTw3ExzgECYkEBMOYMXSCACH5BAUDAD8ALAcAAAAHAAgAAAYcwNBvSCQqij8fiFMkDIXIFPLyERRRn1axl1gEAQAh%2BQQFAwA%2FACwLAAcAAwADAAAGCsDIB3P5CFCeXxAAIfkEBQMAPwAsCgAHAAQABQAABhHAn7Al%2FIkeiNTP8An9MA5hEAAh%2BQQFAwA%2FACwIAAMABgAKAAAGHMCf8LcaGo9II%2BpXOL6MDCGBASrWEKBhjRQaBgEAIfkEBQMAPwAsBgAAAAgADgAABirA3%2BRHLP4YxJCxYGw6i4%2BndEpsPQVGwi%2F1VE5ODd%2BPQxx8Pj9FsRIqNYMAIfkECQMAPwAsAwAAAAkADgAABiLAn%2FA3Gxp%2FjuNw8kMgldAhIUqtWq%2FKC692DLA%2BHyhhdQwCACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9wKOwQj0QGKYQ8XnwgR5NIYHymxAeCgR1efqLuDyUWkstfYgBJQBAdgPCwCiLWQBAJ7NSAco4VBh%2BDHyQKUw8KISVHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGn%2BBQehItCBADubwwQCtpMIHgoEVXj6vLupTEH9aP1OE%2BRX8DCORkYBICU0bgHtIqC6FNRsQEicnDT4gHEULGh%2BOHyQKTA8hISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGVsCfcEgsGoe9Y1EBciiHDwYI8xSWEIyqUPexBVQBZeRTWHwoStSn5QIllJeP4GeQvYwEREpY2QBERARSIUMwGyMSMScNPiAcRSYsH5MfJApKDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZRwJ9wSCwaj8ghLTl0gFbMHwGR%2Bs0GCuTlI8B9DkjUp7X4UMJjFyih5f4MspdxWv1VNgARkcAAhYYwGyMSMScNPiAcRSYsH44fJFlHDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZVwJ9wSCwaj8gjIZBk%2FlgaZCb1m30kSN3HhvvUkJFPYfGhIFGflguUQF4%2Bgp9B9jISENRfZQMQEQkMICFDMBsjEjEnDT4gHEUmLB%2BSHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGo%2FCCZJo2nCWQsNIBHWBeEvLjvY5IAuf1uJDQaLC1gTy8hH8DLKXkYBICSsbAHVIYIBCQzAbIxIxJw0%2BIE9MLB%2BOHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGU8CfcEgsCnNGYw3gSg5NG0DJKWSNetTf7JPI%2FhQfincRdgoUOReom7x8BD%2BD7GV8IBjCSlREJDA%2BIUMwGyMSMScNPiAORSYsH5AfKYFJDwohU0RBACH5BAkDAD8ALAAAAAAOAA4AAAZPwJ9wSCwKFyhjsXYDKIemDUDwFLJG1Orsw6sKcZ%2BD97f4UMYuUGL8M8hexkemI6xIRcQHA7QawjYjEjE1Ej4gDkUmLB%2BMHyQhTw8KGCVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGSsCfcEgsChcajJFY20BOS6FpAxBEhYaR6PqbfXjcH%2B5zCC8%2BlLALlAj%2FDLJXuELdDh%2BBImwzksRODQgNRiYsH4cfJCFRDworJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9Q2BkajQsN4nisbUaSAFNougEE06FhJMoKZyCeV0j7HMa%2FxYeCdoES6J9B9kJXNoDuGPaUxGA2WSYsH4UZYw8KGARHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPhQDY%2FDBetzQB5rN4hk4hRWNgBBdWgYibZCFYgHFtKY5d%2B5WRaT091v%2BQqQg6HSV1n5MaV%2FDwFVQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPiwDI%2FDBetjQB5rG4ik5RSaNgBRdWgYabc%2FF4gHFtI%2Bh%2FIP96GoZ5%2BE%2Bsca9dQLrEBdA6HmRnNqQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGN8CfUPgwDY9DE%2BvjQx5jm5Ek4hSaNgBRdWiQvbZCF4gHFtI%2Bh%2FIPh1bPPmS1YURQmxzqvH4%2FDAIAIfkECQMAPwAsAAAAAA4ADgAABjXAn1D4UASGSKGJ9fmokkPYZiSJHaGmDUAERRpkr%2B7QBeKJh4sP5SzEfWrs38yziNvv%2BLw%2BCAAh%2BQQJAwA%2FACwAAAAADgAOAAAGL8CfUPhQBIZIoYn1%2BaiSQ9hmJIkdoaYNQARFGmTcrlAF4omHFhLqzG673%2FC4%2FBwEACH5BAkDAD8ALAAAAAAOAA4AAAYqwJ9Q%2BAgFhkjhQvP5qJLD2gYiOR2hpg1AAEUaRqIu8rESm8%2FotHrNbrODACH5BAkDAD8ALAAAAAAOAA4AAAYowJ9QSFgFhkghTfP5qJLD2g3Cqx2hOQDABk3uSt2weEwum8%2FotBoZBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGI8CfUEgIBYZI4ULz%2BaiSwx1iJDkdoUKTCMvter%2FgsHhMLpeDACH5BAkDAD8ALAAAAAAOAA4AAAYgwJ9QSFgFhkihSvP5qJLJAe9whFqv2Kx2y%2B16v%2BDwMAgAIfkECQMAPwAsAAAAAA4ADgAABh7An1BICAWGyKHl81Eln5nT8UmtWq%2FYrHbL7Xq%2FwyAAIfkECQMAPwAsAAAAAA4ADgAABh3An1D4WAWGSCTno0o6S7Wjc0qtWq%2FYrHbL7XqHQQAh%2BQQFAwA%2FACwAAAAADgAOAAAGGsCfcIgLDI9IgArJ%2FBWb0Kh0Sq1ar9isVhoEACH5BAUDAD8ALAYAAAABAAMAAAYFQAFHEAQAIfkECQMAPwAsBgAAAAEAAwAABgXAnK0TBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGFMCfcEgsGo%2FIpHLJbDqf0Kh0agwCACH5BAUDAD8ALAAAAAAOAA4AAAYUwJ9wSCwaj8ikcslsOp%2FQqHRqDAIAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAOw%3D%3D';

const FUSE_OPTIONS = {
  caseSensitive: false,
  keys: ['label'],
  threshold: 0.4
};

let AddGameForm = forms.Form.extend({
  bggId: forms.IntegerField({
    label: 'BoardGameGeek ID',
    helpText: 'If provided this will pull data from BoardGameGeek.com',
    cssClass: 'row center-xs',
    controlled: true
  }),
  owner: forms.CharField({
    label: 'Who owns this game?',
    helpText: 'This defaults to you owning the game.  If it it someone elses, enter their username.' +
              ' They will be notified via email and once confirmed the game will be listed.',
    initial: cookie().get('username')
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
    this.onChange = this.onChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.getOptionsForInputValue = _.debounce(this.getOptionsForInputValue, 100);
    this.getOptionsForInputValue = this.getOptionsForInputValue.bind(this);
    this.handleSearchComplete = this.handleSearchComplete.bind(this);
    let storeState = this.getStateFromStores();
    this.state = {
      formValid: false,
      isLoading: storeState.isLoading,
      users: storeState.users,
      searchOptions: [],
      searchValue: ''
    };
  }

  getStateFromStores () {
    let stores = this.context.flux.stores;
    return {
      isLoading: stores.games.isLoading(),
      users: stores.users.getAllUsers()
    };
  }

  setStateFromStores () {
    this.setState(this.getStateFromStores());
  }

  componentDidMount () {
    let stores = this.context.flux.stores;
    UserAPIUtils.getAllUsers();
    stores.games.addListener('change', this.onChange);
    stores.users.addListener('change', this.onChange);
  }

  componentWillUnmount () {
    let stores = this.context.flux.stores;
    stores.games.removeListener('change', this.onChange);
    stores.users.removeListener('change', this.onChange);
  }

  onChange () {
    let state = this.getStateFromStores();
    this.setState(state);
  }

  handleTypeAheadFilter (inputVal, option) {
    // console.log(inputVal);
    // console.log(option);
    results = this.fuse.search(inputVal);
    return results;
  }

  handleBGGSearch (event) {
    let inputValue = event.target.value;
    let that = this;
    axios
      .get('//bgg-api.herokuapp.com/api/v1/search', {
        params: {
          query: inputValue,
          type: 'boardgame,boardgameexpansion'
        }
      })
      .then((response) => {
        let games = response.data;
        if (games.items && games.items.item) {
          var results = games.items.item.map((item) => {
            // return item.$.id;
            return {
              value: item.$.id,
              label: item.name[0].$.value
            };
          });
        }
        that.setState({searchOptions: results || []}, () => {
          that.fuse = new Fuse(that.state.searchOptions, FUSE_OPTIONS);
        });
      });
  }

  getOptionsForInputValue (inputValue) {
    let that = this;
    return new Promise((resolve, reject) => {
      axios.get('//bgg-api.herokuapp.com/api/v1/search', {
        params: {
          query: inputValue,
          type: 'boardgame,boardgameexpansion'
        }
      })
      .then((response) => {
        let games = response.data;
        if (games.items && games.items.item) {
          var results = games.items.item.map((item) => {
            // return item.$.id;
            return {
              value: item.$.id,
              label: item.name[0].$.value
            };
          });
        }
        that.setState({searchOptions: results});
        resolve(
          results
          // results.map((game) => { return game.value; })
        );
      });
    });
  }

  getLabelForOption (value) {
    return value.label;
  }

  handleSearchChange (newValue) {
    this.setState({searchValue: newValue});
  }

  handleSearchComplete (newValue) {
    if (newValue) {
      let form = this.refs.addGameForm.getForm();
      form.updateData({bggId: newValue.value});
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    let form = this.refs.addGameForm.getForm();
    let isValid = form.validate();
    if (!isValid) {
      this.setState({formValid: false});
      return;
    } else {
      this.setState({formValid: true, isLoading: true}, () => {
        let cleanedData = (form.cleanedData) ? form.cleanedData : null;

        var requestObj = {};
        requestObj.owners = [];
        for (let key in cleanedData) {
          if (key === 'available') {
            continue;
          }
          requestObj[key] = cleanedData[key];
        }
        let ownerObj = _.find(this.state.users, {username: cleanedData.owner});
        requestObj.owners.push({
          owner: ownerObj._id,
          available: true
        });
        this.context.flux.actions.games.createGame(requestObj, form);
      });
    }
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
    if (this.state.isLoading) {
      return (
        <div>
          <div className="row center-xs">
            <div className="col-xs-6">
              <h2>Add A Game</h2>
            </div>
          </div>
          <div className="AddGame__Form-Container AddGame__Form-Container--loading row center-xs">
            <div className="col-xs-10 AddGame__Form-Container--loading">
              <img className="AddGame__LoadingSpinner" src={SPINNER} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Add A Game</h2>
          </div>
        </div>
        <div className="AddGame__Form-Container row center-xs">
          <div className="col-xs-10">
            <label>Search BGG for the game</label>
            <Combobox
              getOptionsForInputValue={this.getOptionsForInputValue}
              getLabelForOption={this.getLabelForOption}
              onChange={this.handleSearchChange}
              onComplete={this.handleSearchComplete}
              value={this.state.searchValue} />
            <form className="AddGame__Form" ref="addGameFormContainer" onSubmit={this.handleSubmit}>
              <forms.RenderForm form={AddGameForm} ref="addGameForm" onChange={this.handleFormChange.bind(this)}>
                <Container className="AddGame__FormFieldContainer">
                  <Row className="center-xs" autoColumns="xs">
                    <Field name="bggId" />
                  </Row>
                  <Row className='center-xs' autoColumns='xs'>
                    <Field name='owner' />
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

AddGame.displayName = 'AddGame';

export default AddGame;
