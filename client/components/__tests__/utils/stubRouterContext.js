var React = require('react');
var flux = require('../../../flux');

var stubRouterContext = function (Component, props, stubs) {
  class RouterStub extends React.Component {
    constructor (props, context) {
      super(props, context);
    }

    static makePath () {}
    static makeHref () {}
    static transitionTo () {}
    static replaceWith () {}
    static goBack () {}
    static getCurrentPath () {}
    static getCurrentRoutes () {}
    static getCurrentPathname () {}
    static getCurrentParams () {}
    static getCurrentQuery () {}
    static isActive () {}
    static getRouteAtDepth () {}
    static setRouteComponentAtDepth () {}

    getChildContext () {
      return {
        router: RouterStub,
        routeDepth: 0,
        flux: flux
      };
    }

    render () {
      return (<Component {...props} />);
    }
  }

  RouterStub.childContextTypes = {
    router: React.PropTypes.func,
    routeDepth: React.PropTypes.number,
    flux: React.PropTypes.object.isRequired
  };

  return RouterStub;
};

export default stubRouterContext;
