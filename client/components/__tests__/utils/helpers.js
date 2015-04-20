var React = require('react');
var _currentDiv = null;

var renderComponent = function (Component, props, children, callback) {
  _currentDiv = document.createElement('div');
  document.body.appendChild(_currentDiv);
  return React.render(
    <Component {...props}>
      {children}
    </Component>
  , _currentDiv, callback);
};

var unmountComponent = function () {
  React.unmountComponentAtNode(_currentDiv);
  document.body.removeChild(_currentDiv);
  _currentDiv = null;
};

module.exports = {
  renderComponent: renderComponent,
  unmountComponent: unmountComponent
};
