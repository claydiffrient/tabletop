/*eslint-env mocha */
var React = require('react/addons');
var stubRouterContext = require('./utils/stubRouterContext');
var VoteTable = require('../VoteTable');
var TestUtils = React.addons.TestUtils;
var expect = require('expect.js');

describe('VoteTable Component', function () {
  var voteTable;

  afterEach(() => {
    React.unmountComponentAtNode(React.findDOMNode(voteTable).parentNode);
  });

  it('should render properly', () => {
    var ComponentToTest = stubRouterContext(VoteTable, {});
    voteTable = TestUtils.renderIntoDocument(
      <ComponentToTest />
    );
    expect(voteTable).to.be.ok();
  });

  xit('renders out single votes properly', () => {
    var ComponentToTest = stubRouterContext(VoteTable, {
      votes: {'test': 10}
    });
    voteTable = TestUtils.renderIntoDocument(
      <ComponentToTest />
    );

  });
});
