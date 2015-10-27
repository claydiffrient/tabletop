import * as ActionTypes from '../actions/gameActions';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import initialState from '../store/initialState';
import { cloneDeep } from 'lodash';

const ROOT_REDUCER = handleActions({
  [ActionTypes.GOT_GAMES]: (state, action) => {
    let newState = cloneDeep(state);
    newState.gameList.games = newState.gameList.games.concat(action.payload);
    return newState;
  }
}, initialState);

export default ROOT_REDUCER;
