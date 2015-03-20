import React from 'react';
// TODO: Fix when react-router fully supports 0.13
import Router from 'react-router/build/npm';
const { Route, DefaultRoute, NotFound } = Router;

import App from './components/App';

export default (
  <Route name="app" path="/" handler={App}>
  </Route>
);


/***
<DefaultRoute name="index" handler={Index} />
    <Route name="games" path="games" handler={GameList} />
    <Route name="addGame" path="games/add" handler={AddGame} />
    <Route name="editGame" path="games/edit/:id" handler={EditGame} />
    <Route name="editAvailability" path="games/availability/:id" handler={EditAvailability} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
**/