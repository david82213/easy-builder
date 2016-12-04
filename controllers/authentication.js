var User = require('../models/user');

exports.signup = function(req, res, next) {
  // res.send({ success: 'true' });
  // console.log(req.body);
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

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
        res.json({success: true});
    });

  });


}
