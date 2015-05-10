import React from 'react';
import IgnoredGameList from './IgnoredGameList';

class Profile extends React.Component {
  constructor (props, context) {
    super(props, context);
  }



  render () {
    let userId = this.context.router.getCurrentParams().id;

    return (
      <div>
        <div className="alert alert-warning text-center">This is a feature in progress.</div>
        <IgnoredGameList userId={userId} />
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func
};

export default Profile;
