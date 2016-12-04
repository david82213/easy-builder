var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

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

// create model class
var modelClass = mongoose.model('user', userSchema);

// export model
module.exports = modelClass;
