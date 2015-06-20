var express = require('express');
var router = express.Router();
var passport = require('passport');
var debug = require('debug')('tabletop:Authentication');

/**
 * Slack authentication
 */
router.get('/slack', passport.authenticate('slack'));

router.get('/slack/callback', passport.authenticate('slack',
  { failureRedirect: '/signin',
    successRedirect: '/'
  }));

// Link slack to an existing account.
router.get('/slack/link', passport.authorize('slack', { failureRedirect: '/login'}));

/**
 * Local authentication
 */
router.post('/local', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
  res.cookie('username', req.user.username || '');
  res.cookie('firstname', req.user.firstName || '');
  res.cookie('lastname', req.user.lastName || '');
  res.cookie('ignoredGames', req.user.ignoredGames || []);
  res.redirect('/');
});

router.post('/local-signup', passport.authenticate('local-signup', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
  res.cookie('username', req.user.username || '');
  res.cookie('firstname', req.user.firstName || '');
  res.cookie('lastname', req.user.lastName || '');
  res.cookie('ignoredGames', req.user.ignoredGames || []);
  res.redirect('/');
});

router.get('/logout', function (req, res) {
  var userId = req.user.id;
  debug('Logging out ' + userId);
  req.logout();
  res.redirect('/');
});

module.exports = router;
