import React from 'react';
import UserAPIUtils from '../utils/UserAPIUtils';

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
    return (<li>Temporary</li>);
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
