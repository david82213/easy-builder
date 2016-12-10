var Authentication = require('./controllers/authentication');
var passport = require('passport');
var passportConfig = require('./services/passport');

// since using token, no need for session
var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignin = passport.authenticate('local', { session: false });

// a convenient variable to refer to the HTML directory
var templates_dir = './templates';
// var path = require('path');

var fs = require('fs')
var path = require('path');

var User = require('./models/user');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.send(['a', 'b', 'c']);
  // });

  // pass requireAuth first
  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'ok' });
  });

  app.post('/signup', Authentication.signup);

  app.post('/signin', requireSignin, Authentication.signin);

  // routes to serve the static HTML files
  app.get('/templates/blog', function(req, res) {
      // res.render(html_dir);
      // res.send('ok');

      // const pathToTemplate = path.join(__dirname, 'templates', 'blog');
      // res.sendFile(
      //   'index.html',
      //   { root: pathToTemplate }
      // );
      console.log(User);
      const u = new User({firstName: 'dan', lastName: 'dan', email: 'dan2@dan.com', password: '123', template: { blog: 'blogTemplateContents' }});

      u.save(function (user, error) {
        debugger

      })

    res.sendFile(path.join( __dirname, 'templates/blog', 'index.html' ));
  });

  // app.get('/public/templates', function(req, res, next) {
  //   res.send(getDirectories(templates_dir));
  // });

  // app.get('/templates/blog', function(req, res, next){
  //   res.sendFile(path.join( __dirname, 'templates/blog', 'index.html' ));
  // });

  // json with href hardcode
  // app.get('/templates/blog', function(req, res, next){
  //   res.render('blog/index', {layout: true}, function(err, html){
  //     var response = {
  //       template_type: 'Blog',
  //       template_body_html: html
  //     };
  //     res.send(response);
  //   });
  // })
}
