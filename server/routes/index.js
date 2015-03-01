var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../utils/ensureAuthenticated');

router.get('/', ensureAuthenticated, function (req, res) {
  res.render('home', {
    apiUrl: process.env.API_URL || 'http://localhost:3000/v1/',
    accessToken: process.env.ACCESS_TOKEN || 'test'
  });
});

router.get('/signin', function (req, res) {
  res.render('login');
});

/* GET All routes, let react-router handle routing */
router.get('*', ensureAuthenticated, function(req, res) {
  res.render('home', {
    apiUrl: process.env.API_URL || 'http://localhost:3000/v1/',
    accessToken: process.env.ACCESS_TOKEN || 'test'
  });
});

module.exports = router;
