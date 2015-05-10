import React from 'react';
import UserAPIUtils from '../utils/UserAPIUtils';
import _ from 'lodash';

class IgnoredGameList extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  getStateFromStores () {
    let stores = this.context.flux.stores;
    return {
      games: stores.games.getAllGames(),
      user: {
        ignoredGames: stores.users.getIgnoredGames()
      }
    };
  }

  setStateFromStores () {
    this.setState(this.getStateFromStores());
  }

  componentWillMount () {
    UserAPIUtils.getAllIgnoredGames({userId: this.props.userId});
  }

  componentDidMount () {
    let stores = this.context.flux.stores;
    stores.users.addListener('change', this.onChange);
    stores.games.addListener('change', this.onChange);
  }

  componentWillUnmount () {
    let stores = this.context.flux.stores;
    stores.users.removeListener('change', this.onChange);
    stores.games.removeListener('change', this.onChange);
  }

  onChange () {
    let state = this.getStateFromStores();
    this.setState(state);
  }

  handleUnIgnoreClick (gameToUnIgnore, event) {
    event.preventDefault();
    this.context.flux.actions.users.unIgnoreGame(gameToUnIgnore._id, this.props.userId);
  }

  renderGames () {
    if (!this.state.user.ignoredGames.length) {
      return (<div>You have no ignored games.</div>);
    }
    return this.state.user.ignoredGames.map((game) => {
      let foundGame = _.find(this.state.games, (fGame) => {
        return fGame._id === game;
      });
      return (
        <li className="IgnoredGameList__Game list-group-item">
          {foundGame.title}
          <button className="IgnoredGameList__Game-Unignore btn btn-xs btn-primary"
                  type="button"
                  title="Click to unignore this game."
                  onClick={this.handleUnIgnoreClick.bind(this, foundGame)}
          >
          Unignore
          </button>
        </li>
      );
    });
  }

  render () {
    return (
      <div className="IgnoredGameList panel panel-default">
        <div className="IgnoredGameList__Title panel-heading">Ignored Games</div>
        <div className="panel-body">
          <ul className="IgnoredGameList__List list-group" >
            {this.renderGames()}
          </ul>
        </div>
      </div>
    );
  }
}

IgnoredGameList.propTypes = {
  userId: React.PropTypes.string.isRequired
};

IgnoredGameList.contextTypes = {
  flux: React.PropTypes.object
};

export default IgnoredGameList;
