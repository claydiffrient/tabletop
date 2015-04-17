var React = require('react');
var _ = require('lodash');

var stubRouterContext = function (Component, props, stubs) {
  function RouterStub () { }

  _.assign(RouterStub, {
    makePath: function () {},
    makeHref: function () {},
    transitionTo: function () {},
    replaceWith: function () {},
    goBack: function () {},
    getCurrentPath: function () {},
    getCurrentRoutes: function () {},
    getCurrentPathname: function () {},
    getCurrentParams: function () {},
    getCurrentQuery: function () {},
    isActive: function () {},
    getRouteAtDepth: function () {},
    setRouteComponentAtDepth: function () {}
  }, stubs);

  return React.createClass({
    displayName: 'RouterStub',
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number
    },

    getChildContext: function () {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    },

    render: function () {
      return (Component({props: props}));
    }
  });
};

module.exports = stubRouterContext;
