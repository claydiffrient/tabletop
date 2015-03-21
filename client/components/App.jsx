import React from 'react';
import flux from '../flux';
import Router from 'react-router';
const { RouteHandler } = Router;

class App extends React.Component {

  getChildContext() {
    return { flux };
  }

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

App.childContextTypes = {
  flux: React.PropTypes.object.isRequired
};


export default App;


