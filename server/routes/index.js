var express = require('express');
var router = express.Router();

/* GET All routes, let react-router handle routing */
router.get('*', function(req, res) {
  res.render('home');
});

module.exports = router;
