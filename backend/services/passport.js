// passport is to check is user is logged in
// before user can go to other controllers
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var JwtExtract = require('passport-jwt').ExtractJwt;

var config = require('../config');
var User = require('../models/user');

var LocalStrategy = require('passport-local');

var TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

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

var twitterLogin = new TwitterStrategy({
    consumerKey: config.twitterAuth.consumerKey,
    consumerSecret: config.twitterAuth.consumerSecret,
    callbackURL: config.twitterAuth.callbackURL,
    passReqToCallback: true
  },
  (req, accessToken, tokenSecret, profile, done) => {
  if (req.user) {
    User.findOne({ twitter: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.twitter = profile.id;
          user.tokens.push({ kind: 'twitter', accessToken, tokenSecret });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
          user.save((err) => {
            if (err) { return done(err); }
            req.flash('info', { msg: 'Twitter account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ twitter: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User();
      user.email = `${profile.username}@twitter.com`;
      user.twitter = profile.id;
      user.tokens.push({ kind: 'twitter', accessToken, tokenSecret });
      user.profile.name = profile.displayName;
      user.profile.location = profile._json.location;
      user.profile.picture = profile._json.profile_image_url_https;
      user.save((err) => {
        done(err, user);
      });
    });
  }
});

var googleLogin = new GoogleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackURL,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
          user.save((err) => {
            req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.image.url;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
});

// passport use strategy
passport.use(jwtLogin);
passport.use(localLogin);

passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err,  user);
  });
});

passport.use(twitterLogin);
passport.use(googleLogin);
