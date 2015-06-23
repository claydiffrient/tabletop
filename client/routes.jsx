import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute } = Router;

import App from './components/App';
import Index from './components/Index';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import EditAvailability from './components/EditAvailability';
import Profile from './components/Profile';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';

export default (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='index' handler={Index} />
    <Route name='games' path='games' handler={GameList} />
    <Route name='addGame' path='games/add' handler={AddGame} />
    <Route name='editAvailability' path='games/availability/:id' handler={EditAvailability} />
    <Route name='profile' path='users/:id' handler={Profile} />
    <Route name='login' path='login' handler={LoginPage} />
    <Route name='forgotpassword' path='login/forgot' handler={ForgotPasswordPage} />
    <Route name='resetpassword' path='resetpassword/:token' handler={ResetPasswordPage} />
  </Route>
);
