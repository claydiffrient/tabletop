import React from 'react';
import UserAPIUtils from '../utils/UserAPIUtils';

class ForgotPasswordPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    let value = React.findDOMNode(this.refs.email).value
    UserAPIUtils.sendForgotPassword({email: value});
  }

  render () {
    return (
      <div>
        <div className='row center-xs'>
          <div className='col-xs-6'>
            <h2>Forgot Password</h2>
          </div>
        </div>
        <p>Fill in your email address and an email will be sent with instructions
           to replace your password
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label' htmlFor='email'>Email:</label>
            <input ref='email' className='form-control' id='email' type='text' name='email'/>
          </div>
          <button type='submit'
                  className='btn btn-primary'
            >
              Reset Password
            </button>
        </form>
      </div>
    );
  }
}

ForgotPasswordPage.contextTypes = {
  router: React.PropTypes.func
};

ForgotPasswordPage.displayName = 'ForgotPasswordPage';

export default ForgotPasswordPage;
