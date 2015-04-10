/* global NODE_ENV ENV */
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import GameAPIUtils from './utils/GameAPIUtils';
import VoteAPIUtils from './utils/VoteAPIUtils';
const { HistoryLocation } = Router;

console.log('Initializing in ' + NODE_ENV + ' mode.');

let location = HistoryLocation;

GameAPIUtils.getAllGames();
VoteAPIUtils.getTodaysVotes();

Router.run(routes, location, function (Handler) {
  return React.render(<Handler user={ENV.user} />, document.body);
});
