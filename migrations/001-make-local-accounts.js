var db = require('./db');

exports.up = function (next) {
  db.then(function (database) {
    var collection = database.collection('users');
    collection.find({}).toArray(function (err, users) {
      if (err) { next(err); }
      users.forEach(function (user) {
        console.log(user);
        collection.updateOne(
          {slackName: user.slackName},
          {$set: {username: user.slackName},
           $unset: {slackName: '', provider: ''}}
        );
      });
      next();
    });
  });

};

exports.down = function (next) {
  db.then(function (database) {
    var collection = database.collection('users');
    collection.find({}).toArray(function (err, users) {
      if (err) { next(err); }
      users.forEach(function (user) {
        console.log(user);
        collection.updateOne(
          {username: user.username},
          {$set: {slackName: user.username, provider: 'Slack'},
           $unset: {username: ''}}
        );
      });
      next();
    });
  });
};
