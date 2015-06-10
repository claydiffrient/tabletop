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

/**
 * Local authentication
 */
router.post('/local', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/local-signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
  var userId = req.user.id;
  debug('Logging out ' + userId);
  req.logout();
  res.redirect('/');
});

module.exports = router;
