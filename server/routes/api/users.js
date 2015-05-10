var mongoose = require('mongoose').set('debug', true);
var User = mongoose.model('User');
var express = require('express');
var router = express.Router();
var _ = require('lodash');

/* GET List all users */
router.get('/', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      return res.send(err);
    }
    res.json(users);
  });
});

/* GET List all ignored games for a user */
router.get('/:id/ignoredgames', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    console.log(user);
    if (err) {
      return res.send(err);
    }
    res.json(user.ignoredGames);
  });
});

/* PUT Set a game as ignored for a user */
router.put('/:id/ignoredgames', function (req, res) {
  var toIgnore = req.body.ignore;

  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.send(err);
    }
    user.ignoredGames.push(toIgnore);

    user.save(function (err) {
      if (err) {
        return res.send(err);
      }
      return res.json({ok: true, ignore: toIgnore});
    });
  });
});

/* DELETE Unignore a game for a user */
router.delete('/:id/ignoredgames/:gameId', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.send(err);
    }
    var toRemove = _.find(user.ignoredGames, function (game) {
      return (req.params.gameId === game.toString());
    });

    user.ignoredGames.pull(toRemove);

    console.log(user.ignoredGames);

    user.save(function (err, saved) {
      console.log(saved);
      if (err) {
        console.log('Error');
        return res.error(err);
      }
      return res.status(200).end();
    });
  });
});

module.exports = router;
