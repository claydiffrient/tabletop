import React from 'react';
import flux from '../flux';
import Router from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
const { RouteHandler, Link } = Router;

class App extends React.Component {

  getChildContext() {
    return { flux };
  }

  render() {
    var BrandComponent = <Link to="index">TableTop</Link>;

    return (
      <div>
        <Navbar brand={BrandComponent}>
          <Nav>
            <NavItemLink to="index">Vote List</NavItemLink>
            <NavItemLink to="games">Game List</NavItemLink>
          </Nav>


        </Navbar>
        <div className="container-fluid">
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


