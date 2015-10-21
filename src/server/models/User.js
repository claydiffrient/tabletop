export default function (mongoose) {
  let Schema = mongoose.Schema;

  let UserSchema = new Schema({
    username: {type: String, trim: true, required: true, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please fill a valid e-mail address']
    }
  });

  return mongoose.model('User', UserSchema);
}
