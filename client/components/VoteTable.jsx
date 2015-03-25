import React from 'react';
import _ from 'lodash';


export default class VoteTable extends React.Component {
  constructor(props) {
    super(props);
  }

  sortVotes() {
    var toSort = this.props.votes;
    var sorted = [];
    for (var key in toSort) {
      if (toSort.hasOwnProperty(key)) {
        sorted.push({'key': key, 'value': toSort[key]});
      }
    }

    sorted.sort(function (a, b) {
      return b.value - a.value;
    });

    return sorted;
  }

  renderRows() {
    var sorted = this.sortVotes();
    return sorted.map(function (vote, index) {
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{vote.key}</td>
          <td>{vote.value}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="VoteTable table table-striped table-bordered table-hover" summary="This table shows the votes that have been accumulated today
                      ranked by which has the most votes.">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Game Title</th>
            <th scope="col">Number of Votes</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}