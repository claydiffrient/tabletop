var express = require('express');
var router = express.Router();

/* GET All routes, let react-router handle routing */
router.get('*', function(req, res) {
  res.render('home', {
    apiUrl: process.env.API_URL || 'http://localhost:3000/v1/',
    accessToken: process.env.ACCESS_TOKEN || 'test'
  });
});

module.exports = router;
