import React from 'react';
// TODO: Fix when react-router fully supports 0.13
import Router from 'react-router/build/npm';
const { RouteHandler } = Router;

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row center-xs">
          <div className="col-xs">
            <h1>TableTop Game Selector</h1>
          </div>
        </div>
        <RouteHandler />
      </div>
    );
  }
}