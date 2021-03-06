var express = require('express');
var router = express.Router();

var gameRoutes = require('./games.js');
var userRoutes = require('./users.js');
var voteRoutes = require('./votes.js');

router.use('/v1/games', gameRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/votes', voteRoutes);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('api-index', { title: 'Tabletop API' });
});


module.exports = router;
