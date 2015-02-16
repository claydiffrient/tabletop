var React = require('react');
var GameStore = require('../stores/GameStore');

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

var Filter = React.createClass({
  displayName: 'Filter',

  componentDidMount () {
    console.log(this.props);
  },

  handleClick (event) {
    event.preventDefault();
    this.props.onChange(event.target.id);
  },

  renderFilters () {
    var filters = ['All'];
    filters = filters.concat(letters);
    filters.push('Available');
    elements = filters.map( (filter) => {
      return <li>
               <a href="#"
                  key={filter}
                  id={filter}
                  onClick={this.handleClick}>{filter}</a>
             </li>
    });
    return (
      <ul className="pagination">
        {elements}
      </ul>
    );
  },

  render () {
    return (
      <div>
        <div className="col-xs-12">
          {this.renderFilters()}
        </div>
      </div>
    );
  }
});

module.exports = Filter;