var Game = require('mongoose').model('Game');
var bggLookup = require('./utils/bggLookup');
var express = require('express');
var router = express.Router();
var Entities = require('html-entities').Html5Entities;
var entities = new Entities();
var _ = require('lodash');

var createGame = function (gameRequest, res) {
  var game = new Game(gameRequest);

  game.save(function (err, game) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(game);
  });
};

var removeUnapproved = function (games) {
  return games.map(function (game) {
    _.remove(game.owners, function (owner) {
      return !owner.approved;
    });
    return game;
  });
};

/**
 * List all games
 */
router.get('/', function (req, res) {
  Game.find()
      .populate({
        path: 'owners.owner'
      })
      .sort('title')
      .exec(function (err, games) {
        if (err) {
          return res.send(err);
        }
        // Remove owners that have not approved their ownership
        var onlyApproved = removeUnapproved(games);
        res.json(onlyApproved);
      });
});

/* GET Get one game */
router.get('/:id', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.send(err);
    }
    res.json(game);
  });
});

/* POST Create a new game */
router.post('/', function (req, res) {
  if (req.body.bggId) {
    bggLookup(req.body.bggId, function (err, response) {
      if (err) {
        return res.status(500).send(err);
      }
      req.body.title = response.data.name;
      req.body.thumbnail = response.data.thumbnail;
      req.body.numPlayers = response.data.minPlayers + '-' + response.data.maxPlayers;
      req.body.playTime = response.data.playingTime;
      req.body.description = entities.decode(response.data.description);
      req.body.mechanics = response.data.mechanics;

      if (req.user._id !== req.body.owner) {
        // This gets hit if the user is adding the game for someone else.
      }

      createGame(req.body, res);
    });
  } else {
    createGame(req.body, res);
  }
});

router.put('/:id', function (req, res) {
  var updateObj = req.body;
  // Don't allow these because they are unique
  // Changing one of these requires deleting and recreating
  // the game.
  delete updateObj._id;
  delete updateObj.title;
  delete updateObj.bggId;

  console.log(updateObj);
  Game.findByIdAndUpdate(req.params.id, {
    $set: updateObj
  }, function (err, updatedGame) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(updatedGame);
    updatedGame.populate('owners.owner', function (err, populated) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(populated);
      res.send(populated);
    });
    // res.send(updatedGame);
  });
});

// Add an owner to a game
router.post('/:id/owners/:ownerId', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.status(500).send(err);
    }
    game.owners.push({
      owner: req.params.ownerId,
      available: false // Owning does not imply available
    });
    game.save(function (saveErr) {
      if (saveErr) {
        return res.send(saveErr);
      }
      game.populate('owners.owner', function (popErr, pop) {
        if (popErr) {
          return res.send(popErr);
        }
        res.json(pop);
      });
    });
  });
});

// Remove an owner from a game
router.delete('/:id/owners/:ownerId', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.status(500).send(err);
    }
    var toRemove = _.find(game.owners, function (ownerObj) {
      /*eslint-disable */
      return ownerObj.owner == req.params.ownerId;
      /*eslint-enable */
    });

    if (toRemove) {
      game.owners.pull(toRemove._id);

      game.save(function (saveErr) {
        if (saveErr) {
          return res.status(500).send(saveErr);
        }
        game.populate('owners.owner', function (popErr, pop) {
          if (popErr) {
            return res.status(500).send(popErr);
          }
          res.json(pop);
        });
      });
    } else {
      res.status(500).json({error: 'Could not find game to remove.'});
    }
  });
});

// Update ownership details for a game
router.put('/:id/owners/:ownerId', function (req, res) {
  var updateObj = req.body;
  // Don't get crazy trying to overwrite ids
  delete updateObj._id;

  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.status(500).send(err);
    }
    var owners = game.get('owners');
    var ownerIndex = _.findIndex(owners, function (owner) {
      return owner.owner.toString() === req.params.ownerId;
    });
    owners[ownerIndex].available = updateObj.available;
    game.set('owners', owners);
    game.save(function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      game.populate('owners.owner', function (popErr, pop) {
        if (popErr) {
          return res.status(500).send(popErr);
        }
        res.json(pop);
      });
    });
  });
});

module.exports = router;
