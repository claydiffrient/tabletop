var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var voteSchema = new Schema({
  date: Date,
  game: {type: Schema.Types.ObjectId, ref: 'Game'}
});

module.exports = mongoose.model('Vote', voteSchema);

