import React from 'react';
import Router from 'react-router';
const { Route } = Router;

import App from './components/App';
import Index from './components/Index';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import EditAvailability from './components/EditAvailability';
import EditGame from './components/EditGame';

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="games" path="games" handler={GameList} />
    <Route name="addGame" path="games/add" handler={AddGame} />
    <Route name="editAvailability" path="games/availability/:id" handler={EditAvailability} />
    <Route name="editGame" path="games/edit/:id" handler={EditGame} />
  </Route>
);
