var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// define template model
var templateSchema = new Schema({
  content: {type: String}
}, {
  timestamps: true
});

// create model class
var modelClass = mongoose.model('template', templateSchema);

// export model
module.exports = modelClass;
