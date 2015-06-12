var express = require('express');
var router = express.Router();
var config = require('config');

/* GET All routes, let react-router handle routing */
router.get('*', function (req, res) {
  var user = req.user || '';
  res.render('home', {
    user: JSON.stringify(user),
    env: process.env.NODE_ENV,
    rollbarToken: config.get('Rollbar.clientToken'),
    message: JSON.stringify(req.flash())
  });
});

module.exports = router;
