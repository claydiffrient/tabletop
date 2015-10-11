import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from './store/configureStore';
import App from './components/App';

const history = createHistory();
const store = configureStore({
  userList: {
    users: [],
    meta: {
      currentUser: ''
    }
  },
  gameList: {
    games: [],
    meta: {}
  },
  voteList: {
    votes: [],
    meta: {}
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
