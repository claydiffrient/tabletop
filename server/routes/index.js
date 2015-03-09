var express = require('express');
var router = express.Router();


router.get('/signin', function (req, res) {
  res.render('login');
});

/* GET All routes, let react-router handle routing */
router.get('*', function(req, res) {
  var user = req.user || '';
  res.render('home', {
    user: JSON.stringify(user)
  });
});

module.exports = router;
