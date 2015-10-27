import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';
import page from 'page';

import { fetchGames } from './actions/gameActions';

import App from './components/App';

import './styles/bootstrap4flex.css';

const history = createHistory();
const store = configureStore(initialState);

function mapStateToProps (state) {
  return {
    gameList: state.gameList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onLoad: () => dispatch(fetchGames())
  }
}

let ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

function renderApp () {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('root')
  );
}

page('/', renderApp);

page();
