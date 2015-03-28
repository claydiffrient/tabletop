import { Actions } from 'minimal-flux';
import VoteAPIUtils from '../utils/VoteAPIUtils';

export default class VoteActions extends Actions {

  createVote(date, gameId, userId) {
    this.dispatch('createVote', date, gameId, userId);
    VoteAPIUtils.sendVoteToServer({date, gameId, userId});
  }

}