var express = require('express');
var router = express.Router();

/* GET All routes, let react-router handle routing */
router.get('*', function (req, res) {
  var user = req.user || '';
  res.render('home', {
    user: JSON.stringify(user)
  });
});

module.exports = router;
