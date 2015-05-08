var User = require('mongoose').model('User');
var express = require('express');
var router = express.Router();

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

module.exports = router;
