var React = require('react');

var EditAvailability = React.createClass({
  displayName: 'EditAvailability',

  componentDidMount () {
    console.log(this.props);
  },

  render () {
    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Modify Availability</h2>
          </div>
        </div>
        <div className="EditGame__Form-Container row center-xs">
          <div className="col-xs-10">
            <p> This feature is on it's way </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EditAvailability;