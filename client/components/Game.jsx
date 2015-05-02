/*global ENV*/
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

class Game extends React.Component {

  constructor (props, context) {
    super(props, context);
  }

  checkForAvailability () {
    var availables = this.props.owners.filter((owner) => {
      return owner.available;
    });
    return (availables.length >= 1);
  }

  handleVoteClick () {
    this.context.flux.actions.votes.createVote(new Date(), this.props.id, ENV.user._id);
  }

  handleUnVoteClick () {
    this.context.flux.actions.votes.deleteVote(this.props.votedFor._id);
  }

  renderOwners (owners) {
    if (!owners.length) {
      return (<li>No one currently</li>);
    }
    return owners.map((owner) => {
      // For some reason, owner.owner ends up null, make sure that doesn't
      // break the system.
      if (!owner.owner) {
        return null;
      }
      var ownerObj = owner.owner;
      var classes = classNames({
        'Game__Owner': true,
        'Game__Owner--available': owner.available
      });
      return (<li className={classes}>{ownerObj.firstName + ' ' + ownerObj.lastName} ({ownerObj.slackName})</li>);
    });
  }

  renderGameButtons () {
    if (!ENV.user) {
      return null;
    }
    let available = this.checkForAvailability();
    let voteBtn = null;
    if (this.props.votedFor) {
      voteBtn = (<button
                  className="Game__Buttons-Vote--voted btn btn-success"
                  type="button"
                  onClick={this.handleUnVoteClick.bind(this)}
                 >
                  ✓ Voted
                 </button>);
    } else {
      voteBtn = (<button className="Game__Buttons-Vote btn btn-primary" type="button" disabled={!available || this.props.userHasVoted} onClick={this.handleVoteClick.bind(this)}>Vote</button>);
    }
    return (
      <div>
        {voteBtn}
        <Link className="Game__Buttons-Edit btn btn-link" to="editGame" params={this.props}>Edit Game</Link>
        <Link className="Game__Buttons-Available btn btn-link" to="editAvailability" params={this.props}>Modify Availability</Link>
      </div>
    );
  }

  render () {
    var details = '# of Players: ' + this.props.numPlayers + ' | Playing Time: ' + this.props.playTime;

    let gameClasses = classNames({
      'Game': true,
      'row': true,
      'middle-xs': true,
      'Game--available': this.checkForAvailability()
    });

    return (
      <div className={gameClasses}>
        <div className="Game__ImageColumn col-xs-2">
          <img className="Game__Image img-responsive" src={this.props.thumbnailUrl} />
        </div>
        <div className="Game__DescriptionColumn col-xs-8">
          <h3 className="Game__Title">{this.props.title}<small className="Game__Title-Details">{details}</small></h3>
          <p className="Game__Description">{this.props.description}</p>
          <h4>Owners:</h4>
          <ul className="Game__Owners">
            {this.renderOwners(this.props.owners)}
          </ul>
        </div>
        <div className="Game__VoteColumn col-xs-2">
          {this.renderGameButtons()}

        </div>
      </div>
    );
  }

}

Game.contextTypes = {
  flux: React.PropTypes.object
};

export default Game;
