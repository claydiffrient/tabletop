var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var voteSchema = new Schema({
  date: Date,
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Vote', voteSchema);

