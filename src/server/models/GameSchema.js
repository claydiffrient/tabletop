/* @flow */
import uniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

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

export default GameSchema;
