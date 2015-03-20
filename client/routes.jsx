import React from 'react';
// TODO: Fix when react-router fully supports 0.13
import Router from 'react-router/build/npm';
const { Route, DefaultRoute, NotFoundRoute } = Router;

import App from './components/App';
import Index from './components/Index';

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />

  </Route>
);

/***
   Bring these in slowly as the components are made:
   <Route name="games" path="games" handler={GameList} />
    <Route name="addGame" path="games/add" handler={AddGame} />
    <Route name="editGame" path="games/edit/:id" handler={EditGame} />
    <Route name="editAvailability" path="games/availability/:id" handler={EditAvailability} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
***/