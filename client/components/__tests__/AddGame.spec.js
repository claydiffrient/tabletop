/*eslint-env mocha */
// var React = require('react/addons');
var stubRouterContext = require('./utils/stubRouterContext');
var AddGame = require('../AddGame');
// var TestUtils = React.addons.TestUtils;
var ComponentToTest = stubRouterContext(AddGame, {});
var expect = require('expect.js');
var helpers = require('./utils/helpers');

describe('AddGame Component', function () {
  var component;

  before(function () {
    component = helpers.renderComponent(ComponentToTest).refs.componentUnderTest;
  });

  after(function () {
    helpers.unmountComponent();
  });

  it('should render properly', () => {
    expect(component).to.be.ok();
  });

  it('should have the submit button disabled on initial load', () => {
    let btn = component.refs.submitBtn.getDOMNode();
    expect(btn.disabled).to.be(true);
  });

  it('should be in a loading state after submission', () => {

  });
});
