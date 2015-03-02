var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var GameSchema = new Schema({
  title: { type: String, unique: true, required:true },
  owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
  bggId: { type: Number, unique: true },
  thumbnail: String,
  numPlayers: String,
  playTime: Number,
  description: String
});

GameSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Game', GameSchema);

