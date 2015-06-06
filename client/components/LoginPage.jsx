import React from 'react';

class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>
        <div className='row center-xs'>
          <div className='col-xs-6'>
            <h2>Sign In</h2>
          </div>
        </div>
        <div className='row center-xs'>
          <div className='col-xs-12'>
            <p>Select a service to authenticate with below:</p>
          </div>
        </div>
        <div className='LoginButton__Row row center-xs middle-xs'>
          <div className='col-xs-2'>
            <div className='LoginButton__Container'>
              <a href='/auth/local' className='LoginButton LoginButton-Local btn btn-primary'>
                <span className='fa fa-user' aria-hidden='true'></span> Local Login
              </a>
            </div>
          </div>
          <div className='col-xs-2'>
            <div className='LoginButton__Container'>
              <a href='/auth/slack' className='LoginButton LoginButton-Slack btn btn-primary'>
                <span className='fa fa-slack' aria-hidden='true'></span> Slack
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.func
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
