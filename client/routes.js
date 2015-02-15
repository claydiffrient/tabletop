var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* Components */
var App = require('./components/App.jsx');
var Index = require('./components/Index.jsx');
var NotFound = require('./components/NotFound.jsx');
var Game = require('./components/Game.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="games" path="games/:id" handler={Game} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
  </Route>
);

module.exports = routes;