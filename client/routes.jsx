import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, NotFoundRoute } = Router;

import App from './components/App';
import Index from './components/Index';
import GameList from './components/GameList';
import AddGame from './components/AddGame';

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="games" path="games" handler={GameList}>
      <Route name="addGame" path="add" handler={AddGame} />
    </Route>
  </Route>
);

/***
   Bring these in slowly as the components are made:

    <Route name="editGame" path="games/edit/:id" handler={EditGame} />
    <Route name="editAvailability" path="games/availability/:id" handler={EditAvailability} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
***/