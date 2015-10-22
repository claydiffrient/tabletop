import bcrypt from 'bcrypt';

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

  UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 8, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });

  return mongoose.model('User', UserSchema);
}
