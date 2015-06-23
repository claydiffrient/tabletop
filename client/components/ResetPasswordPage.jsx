import React from 'react';
import UserAPIUtils from '../utils/UserAPIUtils';
import toastr from 'toastr';

class ResetPasswordPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      validToken: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount () {
    let token = this.context.router.getCurrentParams().token;
    UserAPIUtils.checkValidPasswordResetToken ({ token }, (isValid) => {
      this.setState({validToken: isValid}, () => {
        if (!this.state.validToken) {
          toastr.error('The token provided has either expired or is not valid');
        }
      });
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    UserAPIUtils.updateUserPassword();
  }

  render () {
    return (
      <div>
        <div className='row center-xs'>
          <div className='col-xs-6'>
            <h2>Reset Password</h2>
          </div>
        </div>
        <p> Please fill in your new password information.</p>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label' htmlFor='password'>New Password:</label>
            <input ref='password' className='form-control' id='password' type='password' name='password'/>
          </div>
          <div className='form-group'>
            <label className='control-label' htmlFor='confirm'>Confirm Password:</label>
            <input ref='confirm' className='form-control' id='confirm' type='password' name='email'/>
          </div>
          <button type='submit'
                  className='btn btn-primary'
                  disabled={!this.state.validToken}
            >
              Update Password
            </button>
        </form>
      </div>
    );
  }
}

ResetPasswordPage.contextTypes = {
  router: React.PropTypes.func
};

ResetPasswordPage.displayName = 'ResetPasswordPage';

export default ResetPasswordPage;
