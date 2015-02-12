var React = require('react');
var { Link, RouteHandler } = require('react-router');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var api = require('../utils/api');

var sortGames = (games) => {
  return games.slice(0).sort((a, b) => {
    a = (a.name).toLowerCase();
    b = (a.name).toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  });
};

var Root = module.exports = React.createClass({

  statics: {
    fetchData: (token, params, query) => {
      return api.get('/games', token);
    }
  },

  getInitialState () {
    return { longLoad: false };
  },

  componentDidMount () {
    var timeout;
    this.props.loadingEvents.on('start', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.setState({ longLoad: true });
      }, 250);
    });
    this.props.loadingEvents.on('end', () => {
      clearTimeout(timeout);
      this.setState({ longLoad: false });
    });
  },

  renderGames: function() {
    return sortGames(this.props.data.root.games).map((game) => {
      return (
        <li className="GameList__Game" key={game.id}>
          <Link
            className="GameList__Link"
            to="game"
            params={{id: game.id}}
          >
            {game.name}
          </Link>
        </li>
      );
    });
  },

  render: function() {
    var className = 'App';
    if (this.state.longLoad)
      className += ' App--loading';
    return (
      <div className={className}>
        <div className="TopBar">
          Made by Clay Diffrient (based on react-mega-demo by Ryan Florence)
        </div>
        <div className="Master">
          <h2 className="Heading">Games</h2>
          <div className="Content">
            <ul className="GameList">
              <li className="GameList__Game" key="__newLink__">
                <Link
                  className="GameList__Link GameList__Link--new"
                  to="newGame"
                >New Game</Link>
              </li>
              {this.renderGames()}
            </ul>
          </div>
        </div>

        <TransitionGroup transitionName="detail">
          <RouteHandler {...this.props} />
        </TransitionGroup>
      </div>
    );
  }
});