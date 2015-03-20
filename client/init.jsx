import React from 'react';
// TODO: Fix when react-router supports 0.13
import Router from 'react-router/build/npm';
import routes from './routes';
const { HistoryLocation } = Router;

console.log('Initializing in ' + NODE_ENV + ' mode.');

let location = HistoryLocation;

Router.run(routes, location, function (Handler) {
  return React.render(<Handler />, document.body);
});