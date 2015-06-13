/*globals ENV, NODE_ENV */
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import GameAPIUtils from './utils/GameAPIUtils';
import VoteAPIUtils from './utils/VoteAPIUtils';
import toastr from 'toastr';
const { HistoryLocation } = Router;

console.log('Initializing in ' + NODE_ENV + ' mode.');

let location = HistoryLocation;

GameAPIUtils.getAllGames();
VoteAPIUtils.getTodaysVotes();

// Handle flash messages.
let flashMessages = window.ENV.message;
let respondToFlashMessages = () => {
  for (let key in flashMessages) {
    if (key === 'error') {
      flashMessages[key].forEach((errorMessage) => {
        toastr.error(errorMessage, null, {timeOut: 10000});
      });
    } else {
      flashMessages[key].forEach((message) => {
        toastr.info(message, null, {timeOut: 10000});
      });
    }
  }
  flashMessages = {};
};

Router.run(routes, location, function (Handler) {
  setTimeout(respondToFlashMessages, 500);
  return React.render(<Handler user={ENV.user} />, document.body);
});
