var React = require('react');
var { DefaultRoute, Route, NotFoundRoute } = require('react-router');

module.exports = (token) => {

  // hand-wavy dependency injection
  var CreateGame = require('./handlers/CreateGame');
  CreateGame.token = token;

  return [
    <Route name="root" path="/" handler={require('./handlers/Root')}>
      <DefaultRoute handler={require('./handlers/Home')} />
      <Route name="game" path="game/:id" handler={require('./handlers/Game')} />
      <Route name="newGame" handler={require('./handlers/NewGame')} />
      <Route name="createGame" handler={CreateGame} />
    </Route>,
    <NotFoundRoute name="not-found" handler={require('./handlers/NotFound')}/>
  ];
};