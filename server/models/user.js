var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  avatarUrl: String,
  slackName: String,
  slackId {
    type: String
    unique: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(findOrCreate);

modules.export = mongoose.model('User', UserSchema);