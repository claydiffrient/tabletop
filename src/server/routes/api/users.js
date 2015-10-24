/** @flow */
import { Router } from 'express';
let router = Router();

export default function (app: Object) : Object {
  /**
   * @api {get} /users Request list of users
   * @apiName GetUsers
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiSuccess {Object[]} users               List of users
   *
   */
  router.get('/', (req, res) => {
    app.models.user.find({}).exec((err, models) => {
      if (err) return res.status(500).json({err});
      res.json(models);
    });
  });

  /**
   * @api {post} /users Create a user
   * @apiName CreateUser
   * @apiGroup User
   * @apiVersion 1.0.0
   *
   * @apiParam {String} username  The username for the user
   * @apiParam {String} firstName The user's first name
   * @apiParam {String} lastName  The user's last name
   * @apiParam {String} email     The user's email address
   * @apiParam {String} password  The password for the user
   * @apiParamExample {json} Request-Example:
   *   {
   *     "username": "maverick",
   *     "firstName": "Pete",
   *     "lastName": "Mitchell",
   *     "email": "maverick14@example.com",
   *     "password": "goose"
   *   }
   *
   * @apiSuccess {String} username  The username for the user
   * @apiSuccess {String} firstName The user's first name
   * @apiSuccess {String} lastName  The user's last name
   * @apiSuccess {String} email     The user's email address
   * @apiSuccess {String} createdAt When this record was created
   * @apiSuccess {String} updatedAt When this record was last updated
   * @apiSuccess {Number} id        This records unique id
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "username": "maverick",
   *     "firstName": "Pete",
   *     "lastName": "Mitchell",
   *     "email": "maverick14@example.com",
   *     "createdAt": "2015-09-10T04:31:17.127Z",
   *     "updatedAt": "2015-09-10T04:31:17.127Z",
   *     "id": 1
   *   }
   *
   */
  router.post('/', (req, res) => {
    app.models.user.create(req.body, (err, model) => {
      if (err) return res.status(500).json({err});
      res.json(model);
    });
  });

  router.post('/:id/:gameId/ignore', (req, res) => {
    app.models.user.find(req.params.id).exec((err, user) => {
      if (err) res.status(500).json({err});
      user.ignoredGames.add(req.params.gameId);
      user.save((saveError) => {
        if (saveError) res.status(500).json({err: saveError});
      });
    });
  });

  return router;
}
