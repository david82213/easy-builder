// passport is to check is user is logged in
// before user can go to other controllers
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var JwtExtract = require('passport-jwt').ExtractJwt;

var config = require('../config');
var User = require('../models/user');

// options for jwt strategy
var jwtOptions = {};

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
