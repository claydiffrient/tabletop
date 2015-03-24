import { Store } from 'minimal-flux';
import _ from 'lodash';
import moment from 'moment';

export default class VoteStore extends Store {

  constructor(actions) {
    this.setState({votes: []});
    this.handleAction('server.receiveAllVotes', this.handleReceiveAll);
    this.handleAction('server.receiveTodaysVotes', this.handleReceiveToday);
  }

  handleReceiveAll(votes) {
    this.addVotes(votes);
  }

  handleReceiveToday(votes) {
    this.addTodaysVotes(votes);
  }

  addVotes(votes) {
    let savedVotes = this.getState().votes;
    votes = savedVotes.concat(votes);
    this.setState({ votes });
  }

  addTodaysVotes(votes) {
    let savedVotes = this.getState().votes;
    votes = savedVotes.concat(votes);
    votes = _.uniq(votes, function (n) {
      return n._id;
    });
    this.setState({ votes });
  }

  getAllVotes() {
    return this.state.votes;
  }

  getTodaysVotes() {
    let today = moment().startOf('day');
    let tomorrow = moment(today).add(1, 'days').startOf('day');

    return this.state.votes.filter( (vote) => {
      return ((vote.date > today) && (vote.date < tomorrow));
    });
  }

}