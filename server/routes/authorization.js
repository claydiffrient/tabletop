var express = require('express');
var router = express.Router();
var passport = require('passport');
var debug = require('debug')('tabletop:Authentication');
var config = require('config');

// Forgot password stuff
var sendgrid = require('sendgrid')(config.get('Sendgrid.username'), config.get('Sendgrid.password'));
// var bcrypt = require('bcryptjs');
var async = require('async');
var crypto = require('crypto');
var mongoose = require('mongoose').set('debug', true);
var User = mongoose.model('User');

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

// Handles requesting a password reset.
router.post('/local/forgotpassword', function (req, res, next) {
  var email = req.body.email;
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: email}, function (err, user) {
        if (!user) {
          // req.flash('error', );
          return res.status(404).json({error: 'No account with that email address.'});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err2) {
          if (err) {return done(err, token, user);}
          return done(err2, token, user);
        });
      });
    },
    function (token, user, done) {
      var mail = {
        to: email,
        from: 'no-reply@tabletop-selector.herokuapp.com',
        subject: 'Tabletop Selector Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetpassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      sendgrid.send(mail, function (err, json) {
        done(err, token, user);
      });
    }
  ], function (err) {
    if (err) return next(err);
    return res.json({
      success: 'An e-mail has been sent to ' + email + ' with further instructions.'
    });
  });

});

// Handles checking if a password reset token is valid
router.get('/local/resetpassword/:token', function (req, res, next) {
  console.log('In');
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if (err) {
      // TODO: Handle error case here
    }
    if (!user) {
      return res.status(403).json({
        failure: "Token doesn't exist or has expired"
      });
    }
    res.json({
      success: 'Token is valid'
    });
  });
});

module.exports = router;
