/*globals ENV */
import React from 'react';
import flux from '../flux';
import Router from 'react-router';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavItemLink, MenuItemLink } from 'react-router-bootstrap';
const { RouteHandler, Link } = Router;

require('toastr/toastr.css');

class App extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      user: ENV.user
    };
  }

  getChildContext () {
    return { flux };
  }

  renderLoginButton () {
    return (
      <NavItemLink to='login'>
        Login/Signup
      </NavItemLink>
    );
  }

  renderLoggedInAsButton () {
    return (
      <DropdownButton title={'You are logged in as ' + this.state.user.username}>
        <MenuItemLink to="profile" params={{id: this.state.user._id}}>Profile</MenuItemLink>
        <MenuItem href="/auth/logout">Logout</MenuItem>
      </DropdownButton>
    );
  }

  renderAccountArea () {
    if (!this.state.user) {
      return this.renderLoginButton();
    } else {
      return this.renderLoggedInAsButton();
    }
  }

  render () {
    var BrandComponent = <Link to="index">TableTop</Link>;

    return (
      <div>
        <Navbar fluid brand={BrandComponent}>
          <Nav>
            <NavItemLink to="index">Vote List</NavItemLink>
            <NavItemLink to="games">Game List</NavItemLink>
            <NavItem target="_blank" href="https://github.com/claydiffrient/tabletop">
              <img className="GlobalNav__GithubLink-Logo" src="/images/GitHub-Mark-64px.png" /> GitHub
            </NavItem>
          </Nav>
          <Nav navbar right>
            {this.renderAccountArea()}
          </Nav>
        </Navbar>
        <div id='content' className="container-fluid">
          <div className="row center-xs">
            <div className="col-xs">
              <h1>TableTop Game Selector</h1>
            </div>
          </div>
          <RouteHandler />
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  flux: React.PropTypes.object.isRequired
};

export default App;
