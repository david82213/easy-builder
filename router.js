var Authentication = require('./controllers/authentication');

module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.send(['a', 'b', 'c']);
  // });
  app.post('/signup', Authentication.signup);
}
