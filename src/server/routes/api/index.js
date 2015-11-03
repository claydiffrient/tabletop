/** @flow */
import { Router } from 'express';
let router = Router();

import gameRoutes from './games';
import voteRoutes from './votes';

export default (app: Object): Object => {
  router.use('/v1/games', gameRoutes(app));
  router.use('/v1/votes', voteRoutes(app));

  /* GET home page. */
  router.get('/', (req, res) => {
    res.render('api-index', { title: 'Tabletop API' });
  });

  return router;
};
