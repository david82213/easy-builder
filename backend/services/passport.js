// passport is to check is user is logged in
// before user can go to other controllers
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var JwtExtract = require('passport-jwt').ExtractJwt;

var config = require('../config');
var User = require('../models/user');

var LocalStrategy = require('passport-local');

// create local (email, paassword) Strategy
var localLogin = new LocalStrategy(
  { usernameField: 'email' },
  function(email, password, done) {
    // check email and password
    User.findOne({ email: email }, function(err, user){
      if(err){
        return done(err);
      }

      // if email does not exist
      if (!user) {
        return done(null, false);
      }

      // if email exists, check password
      // comparePassword is helper function in user model
      user.comparePassword(password, function(err, isMatch){
        if(err){
          return done(err);
        }

        // if doesnt match
        if (!isMatch){
          return done(null, false);
        }

        // else if matches
        return done(null, user);
      });
    });
});

// options for jwt strategy
var jwtOptions = {
  // look into header and find authorization field
  jwtFromRequest: JwtExtract.fromHeader('authorization'),
  // use the config's secret key to decode
  secretOrKey: config.jwt_secret
};

// create jwt Strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // check payload's user id exist in db or not
  User.findById(payload.sub, function(err, user){
    if(err){
      return done(err, false);
    }

    // if exists, done is associated with user
    if (user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  });
});

// passport use strategy
passport.use(jwtLogin);
passport.use(localLogin);
