import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
let { Schema, model } = mongoose;

let GameSchema = new Schema({
  title: { type: String, unique: true, required: true },
  owners: [{
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    available: Boolean,
    approved: Boolean,
    approvalHash: String
  }],
  bggId: { type: Number, unique: true },
  thumbnail: String,
  numPlayers: String,
  playTime: Number,
  description: String,
  mechanics: [String]
});

GameSchema.plugin(uniqueValidator);

let GameModel = model('Game', GameSchema);

export default GameModel;
