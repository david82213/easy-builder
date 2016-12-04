var jwt = require('jwt-simple');
var config = require('../config');

var User = require('../models/user');

function tokenUser(user){
  var currentTimeStamp = new Date().getTime();
  // take user's id and encode it
  // sub is subject; subject of this token is the current user
  // iat is issued at time
  return jwt.encode({
    sub: user.id, iat: currentTimeStamp
  }, config.jwt_secret);
}

exports.signup = function(req, res, next) {
  // res.send({ success: 'true' });
  // console.log(req.body);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  if (!email){
    return res.status(422).send({ errror: 'Must provide email'});
  }

  // check if email is existed
  User.findOne({ email: email }, function(err, existUser){
    if (err) {
      return next(err);
    }

    // if email exists, return error
    if (existUser) {
      return res.status(422).send(
        { error: 'Email already registered' }
      );
    }

    // else, create & save
    var user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
    user.save(function(err) {
        if (err) {
          return next(err);
        }
        // respond to request indicating user is successfully created
        res.json({token: tokenUser(user)});
    });

  });


}
