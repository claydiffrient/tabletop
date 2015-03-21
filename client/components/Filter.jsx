import React from 'react';

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class Filter extends React.Component {


  renderFilters () {
    var filters = ['All'];
    filters = filters.concat(letters);
    filters.push('Available');
    let elements = filters.map( (filter) => {
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
  }


  render () {
    return (
      <div>
        <div className="col-xs-12">
          {this.renderFilters()}
        </div>
      </div>
    );
  }
}

Filter.contextTypes = {
  flux: React.PropTypes.object
};

export default Filter;

  /*
  handleClick (event) {
    event.preventDefault();
    this.props.onChange(event.target.id);
  },

  */