var db = require('./db');

exports.up = function (next) {
  db.then(function (database) {
    var collection = database.collection('games');
    collection.find({}).toArray(function (err, games) {
      if (err) {
        next(err);
      }
      games.forEach(function (game) {
        console.log(game);
        game.owners.forEach(function (owner) {
          owner.approved = true;
        });
        collection.updateOne(
          {_id: game._id},
          {
            $set: {owners: game.owners}
          }
        );
      });
      next();
    });
  });
};

exports.down = function (next) {
  db.then(function (database) {
    var collection = database.collection('games');
    collection.find({}).toArray(function (err, games) {
      if (err) {
        next(err);
      }
      games.forEach(function (game) {
        console.log(game);
        game.owners.forEach(function (owner) {
          delete owner.approved;
        });
        collection.updateOne(
          {_id: game._id},
          {
            $set: {owners: game.owners}
          }
        );
      });
      next();
    });
  });
};
