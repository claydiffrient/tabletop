var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/slack', passport.authenticate('slack'));

router.get('/slack/callback', passport.authenticate('slack',
  { failureRedirect: '/login',
    successRedirect: '/'
  }));

module.exports = router;