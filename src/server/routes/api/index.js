import { Router } from 'express';
let router = Router();

export default function (app) {
  let gameRoutes = require('./games')(app);
  let userRoutes = require('./users')(app);
  // var voteRoutes = require('./votes.js');

  router.use('/v1/games', gameRoutes);
  router.use('/v1/users', userRoutes);
  // router.use('/v1/votes', voteRoutes);

  /* GET API Docs */
  router.get('/', (req, res) => {
    res.redirect('/docs/api');
  });

  return router;
}
