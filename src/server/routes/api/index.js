import { Router } from 'express';
let router = Router();

import gameRoutes from './games';

export default (app) => {
  router.use('/v1/games', gameRoutes(app));

  /* GET home page. */
  router.get('/', (req, res) => {
    res.render('api-index', { title: 'Tabletop API' });
  });

  return router;
};
