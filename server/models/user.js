var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

modules.export = mongoose.model('User', UserSchema);