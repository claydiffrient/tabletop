var Vote = require('mongoose').model('Vote');
var express = require('express');
var router = express.Router();
var moment = require('moment');

var today = moment().startOf('day');
var tomorrow = moment(today).add(1, 'days');

/* GET List all votes */
/* Include ?date=YYYY-MM-DD to get only votes for that day */
/* Include ?game=gameId to get only votes for that game */
router.get('/', function(req, res) {
  var voteQuery = Vote.find();
  var qDate = req.query.date;
  var qGame = req.query.game;
  if (qDate) {
    if (qDate === 'today') {
      console.log(today, tomorrow);
      voteQuery = voteQuery.where('date').gt(today).lt(tomorrow);
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

  voteQuery.exec(function (err, votes) {
            if (err) {
              return res.send(err);
            }
            console.log(votes);
            res.json(votes);
  });
});


/* POST Create a vote */
router.post('/', function(req, res) {
  var vote = new Vote(req.body);
  vote.save(function (err, savedVote) {
    if (err) {
      return res.send(err);
    }
    Vote.populate(savedVote, {path:'game'},function (err, populated) {
      if (err) {
        return res.send(err);
      }
      res.send(populated);
    });
  })
});

module.exports = router;