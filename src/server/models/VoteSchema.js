/* @flow */
import uniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let VoteSchema = new Schema({
  date: {type: Date, default: new Date() },
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

VoteSchema.plugin(uniqueValidator);

export default VoteSchema;