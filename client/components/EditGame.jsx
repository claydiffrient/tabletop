var React = require('react');
var Router = require('react-router');
var GameStore = require('../stores/GameStore');

var EditGame = React.createClass({
  displayName: 'EditGame',

  mixins: [Router.Navigation, Router.State],

  statics: {
    willTransitionTo () {
      GameStore.fetch();
    }
  },

  getInitialState () {
    return {
      game: {},
      thumbnail: '',
      numPlayers: '',
      playTime: '',
      description: '',
    }
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

  handleInputChange (event) {
    var newState = this.state.game;
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  handleSubmit (event) {
    event.preventDefault();
    var requestObj = {
      _id: this.state.game._id
    };
    for (key in this.refs) {
      requestObj[key] = this.refs[key].getDOMNode().value;
    }
    GameStore.updateGame(requestObj);
    this.transitionTo('games');
  },

  render () {
    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Edit A Game</h2>
          </div>
        </div>
        <div className="EditGame__Form-Container row center-xs">
          <div className="col-xs-10">
            <form className="EditGame__Form" onSubmit={this.handleSubmit}>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="bggId">BGG Id:</label>
                </div>
                <div className="col-xs-4">
                  <input disabled="true" className="form-control" type="text"
                         ref="bggId" id="bggId" name="bggId" value={this.state.game.bggId}
                         aria-describedby="bggIdHelp" />
                  <span id="bggIdHelp" className="help-block">This value cannot be edited.</span>
                </div>
              </div>
              <hr />
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="title">Game Title:</label>
                </div>
                <div className="col-xs-4">
                  <input disabled="true" className="form-control" type="text"
                         ref="title" id="title" name="title" value={this.state.game.title}
                         aria-describedby="titleHelp"/>
                  <span id="titleHelp" className="help-block">This value cannot be edited.</span>
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="thumbnail">Game Thumbnail:</label>
                </div>
                <div className="col-xs-4">
                  <input value={this.state.game.thumbnail} className="form-control"
                         type="text" ref="thumbnail" id="thumbnail" name="thumbnail"
                         onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="numPlayers">Number of Players:</label>
                </div>
                <div className="col-xs-4">
                  <input value={this.state.game.numPlayers} className="form-control"
                        placeholder="Min-Max" type="text" ref="numPlayers" id="numPlayers"
                        name="numPlayers" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="playTime">Time to Play:</label>
                </div>
                <div className="col-xs-4">
                  <input value={this.state.game.playTime} className="form-control"
                         type="text" ref="playTime" id="playTime" name="playTime"
                         onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="row center-xs">
                <div className="col-xs-2">
                  <label htmlFor="description">Description:</label>
                </div>
                <div className="col-xs-4">
                  <textarea value={this.state.game.description} className="form-control"
                            ref="description" id="description" name="description"
                            onChange={this.handleInputChange} />
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

module.exports = EditGame;




