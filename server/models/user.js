var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var axios = require('axios');

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, 'Please fill a valid e-mail address']
  },
  avatarUrl: String, // For future use?
  provider: String,
  slackName: String,
  slackId: {
    type: String,
    unique: true,
    trim: true
  },
  slackTeamId: String,
  created: {
    type: Date,
    default: Date.now
  },
  ignoredGames: [{type: Schema.Types.ObjectId, ref: 'Game'}]
});

var createUser = function (userObj, callback) {
  /* I think this only really works because it is being called from the
     static method... User isn't defined at this point normally though.
     Need to figure out a better way of doing this.
  */
  /*eslint-disable no-undef*/
  // var user = new User(userObj); What was this line even doing here????

  var user = new User({
      slackId: userObj.id,
      slackName: userObj.displayName
    });

  /*eslint-enable */
  user.save(function (err) {
    if (err) {
      return callback(err);
    }
    return callback(err, user);
  });
};

UserSchema.statics.findOrCreate = function (findByObject, token, callback) {
  console.log(this);
  this.findOne(findByObject, function (err, user) {
    if (err) {
      return callback(err);
    }
    if (user) {
      return callback(err, user);
    }
    if (token) {
      // We'll do a call to get more info if a token is provided.
      axios.get('https://slack.com/api/users.info', {
        params: {
          token: token,
          user: findByObject.id
        }
      }).then(function (response) {
        if (response.ok) {
          // If this worked out... let's use this information to augment
          // our user object.
          findByObject.firstName = response.user.profile.first_name;
          findByObject.lastName = response.user.profile.last_name;
          findByObject.email = response.user.profile.email;
          createUser(findByObject, callback);
        } else {
          // If there was a problem with the response... go on with
          // business as usual.
          createUser(findByObject, callback);
        }
      }).catch(function (response) {
        // If there was an error getting more info,
        // we'll just ignore that and go with the original info.
        createUser(findByObject, callback);
      });
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
