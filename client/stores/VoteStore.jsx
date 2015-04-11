import { Store } from 'minimal-flux';
import _ from 'lodash';
import moment from 'moment';

export default class VoteStore extends Store {

  constructor (actions) {
    super(actions);
    this.setState({votes: []});
    this.handleAction('server.receiveAllVotes', this.handleReceiveAll);
    this.handleAction('server.receiveTodaysVotes', this.handleReceiveToday);
    this.handleAction('server.voteCreatedSuccess', this.handleCreateVoteSuccess);
    this.handleAction('server.voteCreatedFailure', this.handleCreateVoteFailure);
    this.handleAction('server.voteDeletedSuccess', this.handleDeleteSuccess);
  }

  handleReceiveAll (votes) {
    this.addVotes(votes);
  }

  handleReceiveToday (votes) {
    this.addTodaysVotes(votes);
  }

  handleCreateVoteSuccess (vote) {
    this.addVotes([vote]);
  }

  handleCreateVoteFailure () {
    // TODO: Better indication of failure.
    console.warn('Vote Creation Failed');
  }

  handleDeleteSuccess (voteId) {
    this.removeVote(voteId);
  }

  addVotes (votes) {
    let savedVotes = this.getState().votes;
    votes = savedVotes.concat(votes);
    this.setState({ votes });
  }

  addTodaysVotes (votes) {
    let savedVotes = this.getState().votes;
    votes = savedVotes.concat(votes);
    votes = _.uniq(votes, function (n) {
      return n._id;
    });
    this.setState({ votes });
  }

  removeVote (voteId) {
    let savedVotes = this.getState().votes;
    _.remove(savedVotes, (n) => {
      return n._id === voteId;
    });
    this.setState({votes: savedVotes});
  }

  getAllVotes () {
    return this.state.votes;
  }

  getTodaysVotes () {
    let today = moment().startOf('day');
    let tomorrow = moment(today).add(1, 'days').startOf('day');

    return this.state.votes.filter((vote) => {
      var date = moment(vote.date);
      return ((date.isAfter(today)) && (date.isBefore(tomorrow)));
    });
  }
}
