import { createAction } from 'redux-actions';
import axios from 'axios';

export const GOT_GAMES = 'GOT_GAMES';
export const gotGames = createAction(GOT_GAMES);


const FETCH_GAMES_ENDPOINT = '/api/v1/games/';
export const fetchGames = (ajaxLib = axios, endpoint = FETCH_GAMES_ENDPOINT) => {
  return (dispatch, getState) => {
    ajaxLib.get(endpoint)
           .then((response) => {
             dispatch(gotGames(response.data));
           });
  };
};
