import React from 'react';

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class Filter extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onChange(event.target.id)
  }

  renderFilters() {
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


  render() {
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
