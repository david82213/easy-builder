var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// define user model
var userSchema = new Schema({
  // lowercase email before saving
  email: {type: String, required: true, trim: true, unique: true, lowercase: true},
  firstName: {type: String, required: true, trim: true},
  lastName: {type: String, required: true, trim: true},
  password: {type: String, required: true}
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

// create model class
var modelClass = mongoose.model('user', userSchema);

// export model
module.exports = modelClass;
