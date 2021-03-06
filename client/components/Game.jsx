/*global ENV*/
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import _ from 'lodash';

const NON_EXPANDED_CHARS_TO_SHOW = 200;

class Game extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = { expandedText: false };
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

  handleIgnoreClick () {
    this.context.flux.actions.users.ignoreGame(this.props.id, ENV.user._id);
  }

  handleReadMoreClick () {
    this.setState({
      expandedText: true
    });
  }

  handleReadLessClick () {
    this.setState({
      expandedText: false
    });
  }

  renderOwners (owners) {
    if (!owners.length) {
      return (<li>No one currently</li>);
    }

    var grouped = _.groupBy(owners, (owner) => {
      return owner.available;
    });

    let sortedOwners = [];
    if (grouped['true']) {
      sortedOwners = sortedOwners.concat(grouped['true']);
    }
    if (grouped['false']) {
      sortedOwners = sortedOwners.concat(grouped['false']);
    }

    return sortedOwners.map((owner) => {
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

      let ownerListText = '';

      if (ownerObj.firstName && ownerObj.lastName) {
        ownerListText = ownerObj.firstName + ' ' + ownerObj.lastName +
                        ' (' + ownerObj.username + ')';
      } else if (ownerObj.firstName) {
        ownerListText = ownerObj.firstName + ' (' + ownerObj.username + ')';
      } else {
        ownerListText = ownerObj.username;
      }


      return (<li className={classes}>{ownerListText}</li>);
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
                  className='Game__Buttons-Vote--voted btn btn-success'
                  type='button'
                  onClick={this.handleUnVoteClick.bind(this)}
                 >
                  ✓ Voted
                 </button>);
    } else {
      voteBtn = (<button className='Game__Buttons-Vote btn btn-primary' type='button' disabled={!available || this.props.userHasVoted} onClick={this.handleVoteClick.bind(this)}>Vote</button>);
    }
    return (
      <div>
        {voteBtn}
        <Link className='Game__Buttons-Available btn btn-link' to='editAvailability' params={this.props}>Modify Availability</Link>
        <button className='Game__Buttons-Hide btn btn-link' type='button' onClick={this.handleIgnoreClick.bind(this)}>Ignore</button>
      </div>
    );
  }

  renderMechanics () {
    let mechanics = this.props.mechanics.map((mechanic, index) => {
      return (<li className='Game__MechanicItem' key={index}>{mechanic}</li>);
    });
    if (this.props.mechanics.length) {
      return (
        <div className='Game__MechanicsContainer'>
          <h4>Mechanics:</h4>
          <ul className='Game__Mechanics'>
            {mechanics}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    var details = '# of Players: ' + this.props.numPlayers + ' | Playing Time: ' + this.props.playTime;

    let gameClasses = classNames({
      'Game': true,
      'row': true,
      'middle-xs': true,
      'Game--available': this.checkForAvailability()
    });

    let description = '';
    let readMoreLessLink = null;
    if (this.state.expandedText) {
      description = this.props.description;
      // Read Less Actually
      readMoreLessLink = (
        <button
          type='button'
          className='Game__ReadToggle btn btn-link'
          onClick={this.handleReadLessClick.bind(this)}
        >Read Less</button>
      );
    } else {
      description = this.props.description.slice(0, NON_EXPANDED_CHARS_TO_SHOW) + '...';
      // Read More Link
      readMoreLessLink = (
        <button
          type='button'
          className='Game__ReadToggle btn btn-link'
          onClick={this.handleReadMoreClick.bind(this)}
        >Read More</button>
      );
    }

    return (
      <div className={gameClasses}>
        <div className='Game__ImageColumn col-xs-2'>
          <img className='Game__Image img-responsive' src={this.props.thumbnailUrl} />
        </div>
        <div className='Game__DescriptionColumn col-xs-8'>
          <h3 className='Game__Title'>{this.props.title}<small className='Game__Title-Details'>{details}</small></h3>
          {this.renderMechanics()}
          <p className='Game__Description'>{description}</p>
          {readMoreLessLink}
          <h4>Owners:</h4>
          <ul ref='gameOwners' className='Game__Owners'>
            {this.renderOwners(this.props.owners)}
          </ul>
        </div>
        <div className='Game__VoteColumn col-xs-2'>
          {this.renderGameButtons()}

        </div>
      </div>
    );
  }

}

Game.contextTypes = {
  flux: React.PropTypes.object
};

Game.propTypes = {
  owners: React.PropTypes.array,
  mechanics: React.PropTypes.arrayOf(React.PropTypes.string),
  votedFor: React.PropTypes.object,
  id: React.PropTypes.string.isRequired,
  userHasVoted: React.PropTypes.bool.isRequired,
  numPlayers: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  playTime: React.PropTypes.number.isRequired,
  thumbnailUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

Game.displayName = 'Game';

export default Game;
