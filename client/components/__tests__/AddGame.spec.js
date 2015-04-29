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
  var form;

  before(function () {
    component = helpers.renderComponent(ComponentToTest).refs.componentUnderTest;
    form = component.refs.addGameForm.getForm();
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

  it('should have the submit button not disabled when a bggId has been entered', () => {
    form.reset();
    form.updateData({bggId: 123456});
    let btn = component.refs.submitBtn.getDOMNode();
    expect(btn.disabled).to.be(false);
  });

  it('should have the submit button valid when all fields other than bggId are filled out', () => {
    form.reset();
    form.updateData({
      title: 'Test',
      thumbnail: 'http://test.test',
      numPlayers: '2-3',
      timeToPlay: 60,
      description: 'testing'
    });
    let btn = component.refs.submitBtn.getDOMNode();
    expect(btn.disabled).to.be(false);
  });

  it('should be in a loading state after submission', () => {

  });
});
