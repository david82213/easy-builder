var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var blogSchema = new Schema({
  blog: {type: Object},
  freelance: {type: Object}
});
// define user model
var userSchema = new Schema({
  // lowercase email before saving
  email: {type: String, trim: true, unique: true, lowercase: true},
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  password: {type: String},
  template: blogSchema,

  twitter: String,
  google: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: String
  }

}, {
  timestamps: true
});

// before model gets saved, encrypt password with bcrypt
userSchema.pre('save', function(next){
  // instance of user model
  var user = this;

  // generate salt
  bcrypt.genSalt(10, function(err, salt){
    if (err) {
      return next(err);
    }

    // hash password by using salt
    // output is called hash in this case
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) {
        return next(err);
      }

      // user's password value will get replaced with this hash
      user.password = hash;
      // save the user model
      next();
    });
  });
});

// comparing if inputted password is the same after salt when compare with the
// exist one in db
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){
      return callback(err);
    }

    callback(null, isMatch);
  });
}

userSchema.methods.gravatar = function gravatar(size){
  if (!size){
    size = 200;
  }

  if (!this.email){
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }

  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}

// create model class
var modelClass = mongoose.model('user', userSchema);

// export model
module.exports = modelClass;
