import React from 'react';
import Router from 'react-router';
import routes from './routes';
const { HistoryLocation } = Router;

console.log('Initializing in ' + NODE_ENV + ' mode.');

let location = HistoryLocation;

Router.run(routes, location, function (Handler) {
  return React.render(<Handler />, document.body);
});