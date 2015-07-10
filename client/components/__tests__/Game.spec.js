/*eslint-env mocha */
var stubRouterContext = require('./utils/stubRouterContext');
var Game = require('../Game');

var expect = require('expect.js');
var helpers = require('./utils/helpers');

var props = {
  owners: [{
    owner: {
      username: 'testusername',
      available: true
    }
  }],
  id: '123abc',
  mechanics: ['Test', 'Test'],
  userHasVoted: false,
  numPlayers: '2-4',
  description: 'Cool description',
  playTime: '80',
  thumbnailUrl: 'image.png',
  title: 'Test Game'
};

window.ENV = {
  user: {
    _id: 'testing'
  }
};

var ComponentToTest = stubRouterContext(Game, props);

describe('Game Component', function () {
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

  it('should show only the username if that is all the user has');
  it('should show the first name and the username if the user has a first name set');
  it('should show the first, last, and user names should all of them be set.');
});
