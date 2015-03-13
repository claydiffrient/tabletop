var Game = require('mongoose').model('Game');
var bggLookup = require('./utils/bggLookup');
var express = require('express');
var router = express.Router();

var createGame = function (gameRequest, res) {
  var game = new Game(gameRequest);

  game.save(function (err, game) {
    if (err) {
      return res.send(err);
    }
    res.json(game);
  })
};




/**
 * List all games
 */
router.get('/', function(req, res) {
  Game.find()
      .populate('owners')
      .exec(function (err, games) {
        if (err) {
          return res.send(err);
        }
        res.json(games);
      });
});

/* GET Get one game */
router.get('/:id', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.send(err);
    }
    res.json(game);
  })
});

/* POST Create a new game */
router.post('/', function(req, res) {
  if (req.body.bggId) {
    bggLookup(req.body.bggId, function (err, response) {
      if (err) {
        return res.send(err);
      }
      req.body.title = response.data.name;
      req.body.thumbnail = response.data.thumbnail;
      req.body.numPlayers = response.data.minPlayers + "-" + response.data.maxPlayers;
      req.body.playTime = response.data.playingTime;
      req.body.description = response.data.description;
      createGame(req.body, res);
    });
  } else {
    createGame(req.body, res);
  }
});

router.put('/:id', function (req, res) {
  var updateObj = req.body;

  // Don't allow these because they are unique
  // Changing one of these requires deleting and creating
  // the game.
  delete updateObj._id;
  delete updateObj.title;
  delete updateObj.bggId;

  Game.findByIdAndUpdate(req.params.id, {
    $set: updateObj
  }, function (err, updatedGame) {
    if (err) {
      res.send(err);
    }
    res.send(updatedGame);
  });
});

module.exports = router;