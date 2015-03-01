var User = require('mongoose').model('User');
var express = require('express');
var router = express.Router();


/* GET List all users */
router.get('/', function(req, res) {
  User.find(function (err, users) {
    if (err) {
      return res.send(err);
    }
    res.json(users);
  });
});

module.exports = router;