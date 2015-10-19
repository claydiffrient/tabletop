import { Router } from 'express';
import { remove } from 'lodash';
import { model } from 'mongoose';
import axios from 'axios';
import { Html5Entities } from 'html-entities';
let entities = new Html5Entities();
let router = Router();

export let bggLookup = (bggId, callback) => {
  const BGG_API = 'http://bgg-json.azurewebsites.net/thing';
  let url = `${BGG_API}/${bggId}`;
  axios.get(url)
       .then(function (response) {
         callback(null, response);
       })
       .catch(function (response) {
         callback(response);
       });
};

export default function (app) {
  let _removeUnapproved = (games) => {
    return games.map((game) => {
      remove(game.owners, (owner) => {
        return !owner.approved;
      });
    });
  };

  /**
   * @api {get} /games Request list of games
   * @apiName GetGames
   * @apiGroup Game
   * @apiVersion 1.0.0
   *
   * @apiSuccess {Object[]} games                   List of games
   * @apiSuccess {Number}   games.bggId             BGG Id
   * @apiSuccess {String}   games.title             Title of the game
   * @apiSuccess {Object[]} games.owners            List of owners
   * @apiSuccess {String}   games.owners.username   The username for the user
   * @apiSuccess {String}   games.owners.firstName  The user's first name
   * @apiSuccess {String}   games.owners.lastName   The user's last name
   * @apiSuccess {String}   games.owners.email      The user's email address
   * @apiSuccess {String}   games.owners.createdAt  When this record was created
   * @apiSuccess {String}   games.owners.updatedAt  When this record was last updated
   * @apiSuccess {Number}   games.owners.id         This records unique id
   * @apiSuccess {String}   games.thumbnailUrl      URL to a thumbnail image
   * @apiSuccess {Number}   games.minPlayers        The minimum number of players
   * @apiSuccess {Number}   games.maxPlayers        The maximum number of players
   * @apiSuccess {String}   games.description       A description of the game
   * @apiSuccess {String[]} games.mechanics         The game's mechanics
   * @apiSuccess {Number}   games.playTime          The average playtime in minutes
   *
   */
  router.get('/', (req, res) => {
    let Game = model('Game');
    Game.find({}).populate('owners').exec((err, models) => {
      if (err) return res.status(500).json({err});
      res.json(_removeUnapproved(models));
    });
  });

  /**
   * POST /games
   * Adds a new game to the database. The game object looks
   * like this:
   * ```
   *   TODO: Add game example here.
   * ```
   */
  router.post('/', (req, res) => {
    if (req.body.bggId) {
      bggLookup(req.body.bggId, function (err, response) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        req.body.title = response.data.name;
        req.body.thumbnail = response.data.thumbnail;
        req.body.numPlayers = response.data.minPlayers + '-' + response.data.maxPlayers;
        req.body.playTime = response.data.playingTime;
        req.body.description = entities.decode(response.data.description);
        req.body.mechanics = response.data.mechanics;

        let Game = model('Game');

        Game.create(req.body, (err, game) => {
          if (err) {
            return res.status(500).json({ err });
          }
          return res.json(game);
        });
      });
    } else {
      return res.status(400).json({
        message: 'You must provide a BoardGameGeek™ ID'
      });
    }
  });

  return router;
}
