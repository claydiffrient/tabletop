import { Router } from 'express';
import { remove } from 'lodash';
let router = Router();

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
    app.models.game.find({}).populate('owners').exec((err, models) => {
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
    app.models.game.create(req.body, (err, model) => {
      if (err) return res.status(500).json({err});
      res.json(model);
    });
  });

  return router;
}
