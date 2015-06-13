import React from 'react';
import ReactModal from 'react-modal';

class LoginPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      showLocalLogin: false,
      showLocalSignup: false
    };
    // Bindings
    this.handleLocalLoginClick = this.handleLocalLoginClick.bind(this);
    this.closeLocalLoginModal = this.closeLocalLoginModal.bind(this);
    this.handleLocalSignupClick = this.handleLocalSignupClick.bind(this);
    this.closeLocalSignupModal = this.closeLocalSignupModal.bind(this);

    // React Modal setup
    let appElement = document.getElementById('content') || document.body;
    ReactModal.setAppElement(appElement);
  }

  handleLocalLoginClick () {
    this.setState({showLocalLogin: true});
  }

  closeLocalLoginModal () {
    this.setState({showLocalLogin: false});
  }

  handleLocalSignupClick () {
    this.setState({showLocalSignup: true});
  }

  closeLocalSignupModal () {
    this.setState({showLocalSignup: false});
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
              <button className='LoginButton LoginButton-Local btn btn-primary'
                      onClick={this.handleLocalLoginClick}>
                <span className='fa fa-user' aria-hidden='true'></span> Local Login
              </button>
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
        <div className='row center-xs'>
          <div className='col-xs-6'>
            <h2>Sign Up?</h2>
          </div>
        </div>
        <div className='row center-xs'>
          <div className='col-xs-12'>
            <p>{'Don\'t have an account yet?  Make one:'}</p>
          </div>
        </div>
        <div className='SignupButton__Row row center-xs middle-xs'>
          <div className='col-xs-2'>
            <div className='SignupButton__Container'>
              <button className='SignupButton SignupButton-Local btn btn-default'
                      onClick={this.handleLocalSignupClick}>
                <span className='fa fa-user' aria-hidden='true'></span> Local Signup
              </button>
            </div>
          </div>
          <div className='col-xs-2'>
            <div className='SignupButton__Container'>
              <a href='/auth/slack' className='SignupButton SignupButton-Slack btn btn-default'>
                <span className='fa fa-slack' aria-hidden='true'></span> Slack
              </a>
            </div>
          </div>
        </div>
        <ReactModal
          ref='loginModal'
          isOpen={this.state.showLocalLogin}
          onRequestClose={this.closeLocalLoginModal}
          className='modal-dialog'
          overlayClassName='Modal__Overlay'
        >
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button'
                        className='close'
                        aria-label='Close'
                        onClick={this.closeLocalLoginModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className='modal-title'>Local Login</h4>
              </div>
              <form action='/auth/local' method='post'>
                <div className='modal-body'>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='local_username'>Username:</label>
                    <input className='form-control' id='local_username' type='text' name='username'/>
                  </div>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='local_password'>Password:</label>
                    <input className='form-control' id='local_password' type='password' name='password'/>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type='button'
                          className='btn btn-default'
                          onClick={this.closeLocalLoginModal}
                  >
                    Close
                  </button>
                  <button type='submit'
                          className='btn btn-primary'
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
        </ReactModal>
        <ReactModal
          ref='signupModal'
          isOpen={this.state.showLocalSignup}
          onRequestClose={this.closeLocalSignupModal}
          className='modal-dialog'
          overlayClassName='Modal__Overlay'
        >
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button'
                        className='close'
                        aria-label='Close'
                        onClick={this.closeLocalSignupModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className='modal-title'>Local Signup</h4>
              </div>
              <form action='/auth/local-signup' method='post'>
                <div className='modal-body'>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='local_username'>Username:</label>
                    <input className='form-control' id='local_username' type='text' name='local_username'/>
                  </div>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='local_password'>Password:</label>
                    <input className='form-control' id='local_password' type='password' name='local_password'/>
                  </div>
                  <div className='form-group'>
                    <label className='control-label' htmlFor='confirmPassword'>Confirm Password:</label>
                    <input className='form-control' id='confirmPassword' type='password' name='confirmPassword'/>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type='button'
                          className='btn btn-default'
                          onClick={this.closeLocalSignupModal}
                  >
                    Close
                  </button>
                  <button type='submit'
                          className='btn btn-primary'
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
        </ReactModal>
      </div>

    );
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.func
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
