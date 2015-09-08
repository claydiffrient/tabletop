import { Router } from 'express';
let router = Router();

export default function (app) {

  /**
   * @api {get} /games Request list of games
   * @apiName GetGames
   * @apiGroup Game
   * @apiVersion 1.0.0
   *
   * @apiSuccess {Object[]} games               List of games
   * @apiSuccess {Number}   games.bggId         BGG Id
   * @apiSuccess {String}   games.title         Title of the game
   * @apiSuccess {Object[]} games.owners        List of owners
   * @apiSuccess {String}   games.thumbnailUrl  URL to a thumbnail image
   * @apiSuccess {Number}   games.minPlayers    The minimum number of players
   * @apiSuccess {Number}   games.maxPlayers    The maximum number of players
   * @apiSuccess {String}   games.description   A description of the game
   * @apiSuccess {String[]} games.mechanics     The game's mechanics
   * @apiSuccess {Number}   games.playTime      The average playtime in minutes
   *
   */
  router.get('/', function (req, res) {
    app.models.game.find({}).exec((err, models) => {
      if (err) return res.status(500).json({err});
      res.json(models);
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

};
