var Authentication = require('./controllers/authentication');
var passport = require('passport');
var passportConfig = require('./services/passport');

// since using token, no need for session
var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.send(['a', 'b', 'c']);
  // });

  // pass requireAuth first
  app.get('/', requireAuth, function(req, res){
    res.send({ hi: 'there' });
  });

  app.post('/signup', Authentication.signup);

  app.post('/signin', requireSignin, Authentication.signin);
}
