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
    expect(index).to.be.ok();
  });
});
