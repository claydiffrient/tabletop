import React from 'react';
import UserAPIUtils from '../utils/UserAPIUtils';
import _ from 'lodash';

// TODO: Refactor into separate module
const ACCOUNT_TYPES = [{
  name: 'slack',
  onAuthorize () {
    window.location = '/auth/slack/link';
  },
  onDeauthorize () {
    // TODO: Delete the token from our system,
    // then redirect to the token deletion page on Slack.
  }
}];

class LinkedAccountsList extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = this.getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  getStateFromStores () {
    let stores = this.context.flux.stores;
    return {
      user: {
        authorizedAccounts: stores.users.getAuthorizedAccounts()
      }
    };
  }

  setStateFromStores () {
    this.setState(this.getStateFromStores());
  }

  componentWillMount () {
    UserAPIUtils.getAuthorizedAccounts({userId: this.props.userId});
  }

  componentDidMount () {
    let stores = this.context.flux.stores;
    stores.users.addListener('change', this.onChange);
  }

  componentWillUnmount () {
    let stores = this.context.flux.stores;
    stores.users.removeListener('change', this.onChange);
  }

  onChange () {
    let state = this.getStateFromStores();
    this.setState(state);
  }

  renderLinkedAccounts () {
    let auths = this.state.user.authorizedAccounts;
    let linkedAccounts = ACCOUNT_TYPES.map((account) => {
      if (_.has(auths, account.name)) {
        return (
          <li className='LinkedAccountsList__Row row list-group-item'>
            <div className='col-xs-5'>{account.name}</div>
            <div className='col-xs-7'>
              <button type='button' className='LinkedAccountsList__Button btn btn-xs btn-default' onClick={account.onDeauthorize}>Deauthorize</button>
            </div>
          </li>
        );
      } else {
        return (
          <li className='LinkedAccountsList__Row row list-group-item'>
            <div className='col-xs-5'>{account.name}</div>
            <div className='col-xs-7'>
              <button type='button' className='LinkedAccountsList__Button btn btn-xs btn-primary' onClick={account.onAuthorize}>Authorize</button>
            </div>
          </li>
        );
      }
    });
    if (linkedAccounts.length) {
      return linkedAccounts;
    } else {
      return null;
    }
  }

  render () {
    return (
      <div className='LinkedAccountsList panel panel-default'>
        <div className='LinkedAccountsList__Title panel-heading'>Linked Accounts</div>
        <div className='panel-body'>
          <ul className='LinkedAccountsList__List list-group' >
            {this.renderLinkedAccounts()}
          </ul>
        </div>
      </div>
    );
  }
}

LinkedAccountsList.propTypes = {
  userId: React.PropTypes.string.isRequired
};

LinkedAccountsList.contextTypes = {
  flux: React.PropTypes.object
};

LinkedAccountsList.displayName = 'LinkedAccountsList';

export default LinkedAccountsList;
