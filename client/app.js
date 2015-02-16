/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

/* Components */
var Index = require('./components/Index.jsx');
var NotFound = require('./components/NotFound.jsx');
var GameList = require('./components/GameList.jsx');
var Game = require('./components/Game.jsx');

var App = React.createClass({
  displayName: 'App',

  mixins: [Navigation],

  componentDidMount () {
    console.log(this.props);
  },

  handleVoteClick () {
    this.transitionTo('games');
  },

  render () {
    return (
      <div className="container">
        <h1>TableTop Game Selector</h1>
        <RouteHandler />
      </div>
    );
  }
});


/*****
* Router stuff
*****/
var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index} />
    <Route name="games" path="games" handler={GameList} />
    <NotFoundRoute name="notfound" handler={ NotFound }/>
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.body);
});