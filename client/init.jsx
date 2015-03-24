import React from 'react';
import Router from 'react-router';
import routes from './routes';
import GameAPIUtils from './utils/GameAPIUtils';
const { HistoryLocation } = Router;

console.log('Initializing in ' + NODE_ENV + ' mode.');

let location = HistoryLocation;

GameAPIUtils.getAllGames();

Router.run(routes, location, function (Handler) {
  return React.render(<Handler />, document.body);
});