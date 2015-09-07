import express from 'express';
let router = express.Router();

// var gameRoutes = require('./games.js');
// var userRoutes = require('./users.js');
// var voteRoutes = require('./votes.js');

// router.use('/v1/games', gameRoutes);
// router.use('/v1/users', userRoutes);
// router.use('/v1/votes', voteRoutes);

/* GET API Docs */
router.get('/', (req, res) => {
  res.redirect('/docs');
});

export default router;
