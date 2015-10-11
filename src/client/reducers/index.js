// import * as ActionTypes from '../actions';
import { merge } from 'lodash';
import { combineReducers } from 'redux';

export function userList (state = {}, action) {
  return state;
}

const rootReducer = combineReducers({
  userList
});

export default rootReducer;
