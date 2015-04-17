/*globals describe before it*/
var React = require('react/addons');
var stubRouterContext = require('./utils/stubRouterContext');
var Index = require('../Index');
var TestUtils = React.addons.TestUtils;
var IndexToTest = stubRouterContext(Index, {});
var expect = require('expect.js');

describe('Index Component', function () {
  var index;

  before(function () {
    index = TestUtils.renderIntoDocument(
      <IndexToTest />
    );
  });

  it('should render properly', () => {
    expect(index).toExist();
  });
});

// var expect = require('expect.js');
// var React = require('react');
// var IndexComponent = require('../../../client/components/Index.jsx');
// // var TestLocation = require('../../utils/TestLocation');
// var TestLocation = require('react-router/lib/locations/TestLocation');
// var ReactRouter = require('react-router');

// describe('Index Component', function () {

//   var Index;

//   var createDOMNode = function () {
//     return document.createElement('div')
//   }

//   before(function () {
//     Index = React.createFactory(IndexComponent);
//   });

//   beforeEach(function () {
//     ENV = {};

//   })

//   it('should render', function () {
//     TestLocation.history = ['/'];
//     var routes = [
//       ReactRouter.Route({path: '/', name: 'index', handler: IndexComponent}),
//       ReactRouter.Route({path: '/games', name: 'games', handler: null})
//     ]

//     ReactRouter.run(routes, TestLocation, function (Handler) {
//       React.render(Handler(), createDOMNode(), function () {

//       });
//     });

//     component = React.render(Index(), createDOMNode());
//     expect(component.isMounted()).to.be.ok();
//   });
// });
