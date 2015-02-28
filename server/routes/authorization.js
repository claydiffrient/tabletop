var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/slack', passport.authorize('slack'));

router.get('/slack/callback', passport.authorize('slack',
  { failureRedirect: '/login'}),
  function (req, res) {
    // Successful authentication
    console.log('success');
    res.redirect('/');
  });

module.exports = router;