var React = require('react/addons');
var classSet = React.addons.classSet;
var VoteStore = require('../stores/VoteStore');
var Navigation = require('react-router').Navigation;

var Game = React.createClass({
  displayName: 'Game',

  mixins: [Navigation],

  componentDidMount () {
    console.log(this.props);
  },

  handleVoteClick (event) {
    event.preventDefault();
    var requestObj = {
      date: new Date(),
      game: this.props.id
    };
    VoteStore.submitVote(requestObj);
    this.transitionTo('index');
  },

  checkForAvailability () {
    var availables = this.props.owners.filter( (owner) => {
      return owner.available;
    });
    return (availables.length >= 1);
  },

  renderOwners (owners) {
    if (!owners.length) {
      return (<li>No one currently</li>);
    }
    return owners.map( (owner) => {
      var classes = classSet({
        'Game__Owner': true,
        'Game__Owner--available': owner.available
      });
      return (<li className={classes}>{owner.name} ({owner.slackId})</li>);
    });
  },


  render () {

    var available = this.checkForAvailability();
    var details = " # of Players: " + this.props.numPlayers + " | Playing Time: " + this.props.playTime;

    return (
      <div className="Game row middle-xs">
        <div className="Game__ImageColumn col-xs-2">
          <img className="Game__Image img-responsive" src={this.props.thumbnailUrl} />
        </div>
        <div className="Game__DescriptionColumn col-xs-8">
          <h3 className="Game__Title">{this.props.title}<small>{details}</small></h3>
          <p className="Game__Description">{this.props.description}</p>
          <h4>Owners:</h4>
          <ul className="Game__Owners">
            {this.renderOwners(this.props.owners)}
          </ul>
        </div>
        <div className="Game__VoteColumn col-xs-2">
          <button className="Game__Buttons-Vote btn btn-primary" type="button" disabled={!available} onClick={this.handleVoteClick}>Vote</button>
          <button className="Game__Buttons-Edit btn btn-link" type="button" onClick={this.handleEditClick}>Edit Game</button>
        </div>
      </div>
    );
  }
});

module.exports = Game;