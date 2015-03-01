var express = require('express');
var router = express.Router();

// var gameRoutes = require('./games.js');
var userRoutes = require('./users.js');
// router.use('/games', gameRoutes);
router.use('/v1/users', userRoutes);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('api-index', { title: 'Tabletop API' });
});


module.exports = router;
