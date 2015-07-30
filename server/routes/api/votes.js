var Vote = require('mongoose').model('Vote');
var User = require('mongoose').model('User');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var config = require('config');
var Rollbar = require('rollbar');
Rollbar.init(config.get('Rollbar.serverToken'));
var today = moment().startOf('day');
var tomorrow = moment(today).add(1, 'days');

/* GET List all votes */
/* Include ?date=YYYY-MM-DD to get only votes for that day */
/* Include ?game=gameId to get only votes for that game */
router.get('/', function (req, res) {
  var voteQuery = Vote.find();
  var qDate = req.query.date;
  var qGame = req.query.game;
  if (qDate) {
    if (qDate === 'today') {
      voteQuery = voteQuery.where('date').gt(today.toDate()).lt(tomorrow.toDate());
    } else {
      var day = moment(qDate).startOf('day');
      var nextDay = moment(day).add(1, 'days');

      voteQuery = voteQuery.where('date').gt(day).lt(nextDay);
    }
  }

  voteQuery = voteQuery.populate('game', 'title');

  if (qGame) {
    voteQuery = voteQuery.where({
      game: qGame
    });
  }

  voteQuery
    .exec(function (err, votes) {
      if (err) {
        return res.send(err);
      }
      res.json(votes);
    });
});

/* POST Create a vote */
router.post('/', function (req, res) {
  var vote = new Vote(req.body);
  vote.save(function (err, savedVote) {
    if (err) {
      return res.send(err);
    }
    if (config.get('Voting.multipleVotes')) {
      User.findById(savedVote.user, function (user) {
        user.availableVotes = user.availableVotes - 1;
        user.save(function (err) {
          if (err) {
            Rollbar.handleError(err);
          }
        });
      });
    }
    Vote.populate(savedVote, 'game user', function (err, populated) {
      if (err) {
        return res.send(err);
      }
      res.send(populated);
    });
  });
});

/* DELETE Remove a vote */
router.delete('/:id', function (req, res) {
  Vote.findByIdAndRemove(req.params.id, function (err, deleted) {
    if (err) {
      return res.send(err);
    }
    if (config.get('Voting.multipleVotes')) {
      User.findById(deleted.user, function (user) {
        user.availableVotes = user.availableVotes + 1;
        user.save(function (err) {
          if (err) {
            Rollbar.handleError(err);
          }
        });
      });
    }
    res.status(200).end();
  });
});

module.exports = router;
