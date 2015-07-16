/*eslint-env mocha */
var stubRouterContext = require('./utils/stubRouterContext');
var Game = require('../Game');
var React = require('react');

var expect = require('expect.js');
var helpers = require('./utils/helpers');

var props = {
  owners: [{
    owner: {
      username: 'testusername'
    },
    available: true
  }],
  id: '123abc',
  mechanics: ['Test', 'Test'],
  userHasVoted: false,
  numPlayers: '2-4',
  description: 'Cool description',
  playTime: 80,
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

  beforeEach(function () {
    component = helpers.renderComponent(ComponentToTest).refs.componentUnderTest;
  });

  afterEach(function () {
    React.unmountComponentAtNode(React.findDOMNode(component).parentNode);
  });

  it('should render properly', () => {
    expect(component).ok();
  });

  it('should show only the username if that is all the user has', () => {
    let userText = component.refs.gameOwners.props.children[0].props.children;
    expect(userText).to.eql('testusername');
  });

  it('should show the first name and the username if the user has a first name set', () => {
    // A bit of setup
    let props = {
      owners: [{
        owner: {
          firstName: 'Test',
          username: 'testusername'
        },
        available: true
      }],
      id: '123abc',
      mechanics: ['Test', 'Test'],
      userHasVoted: false,
      numPlayers: '2-4',
      description: 'Cool description',
      playTime: 80,
      thumbnailUrl: 'image.png',
      title: 'Test Game'
    };

    var ComponentToTest = stubRouterContext(Game, props);
    let component = helpers.renderComponent(ComponentToTest).refs.componentUnderTest;

    let userText = component.refs.gameOwners.props.children[0].props.children;
    expect(userText).to.eql('Test (testusername)');
  });

  it('should show the first, last, and user names should all of them be set.', () => {
    let props = {
      owners: [{
        owner: {
          firstName: 'Test',
          lastName: 'User',
          username: 'testusername'
        },
        available: true
      }],
      id: '123abc',
      mechanics: ['Test', 'Test'],
      userHasVoted: false,
      numPlayers: '2-4',
      description: 'Cool description',
      playTime: 80,
      thumbnailUrl: 'image.png',
      title: 'Test Game'
    };

    var ComponentToTest = stubRouterContext(Game, props);
    let component = helpers.renderComponent(ComponentToTest).refs.componentUnderTest;

    let userText = component.refs.gameOwners.props.children[0].props.children;
    expect(userText).to.eql('Test User (testusername)');
  });

  it('should show the no owners message when there are no owners.', () => {
    let props = {
      owners: [],
      id: '123abc',
      mechanics: ['Test', 'Test'],
      userHasVoted: false,
      numPlayers: '2-4',
      description: 'Cool description',
      playTime: 80,
      thumbnailUrl: 'image.png',
      title: 'Test Game'
    };

    var ComponentToTest = stubRouterContext(Game, props);
    component = helpers.renderComponent(ComponentToTest).refs.componentUnderTest;

    let userText = component.refs.gameOwners.props.children.props.children;
    expect(userText).to.eql('No one currently');
  });
});
