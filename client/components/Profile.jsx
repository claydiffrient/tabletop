import React from 'react';
import IgnoredGameList from './IgnoredGameList';
import LinkedAccountsList from './LinkedAccountsList';

class Profile extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    let userId = this.context.router.getCurrentParams().id;

    return (
      <div>
        <div className='alert alert-warning text-center'>This is a feature in progress.</div>
        <div className='row'>
          <div className='col-xs-3'>
            <IgnoredGameList userId={userId} />
          </div>
          <div className='col-xs-3'>
            <LinkedAccountsList userId={userId} />
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func
};

Profile.displayName = 'Profile';

export default Profile;
