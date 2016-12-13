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

var Twitter = require("node-twitter-api");
var secret = require('./config');
var jwt = require('jwt-simple');

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
    // console.log(req.headers.authorization);
    // var token = new Buffer(req.headers.authorization);
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
    // console.log(token);
    var decoded_user_id = jwt.decode(token, secret.jwt_secret);
    // console.log(decoded_user_id);
    var user = User.findById(decoded_user_id.sub, function(err, existUser){
      if (existUser){
        console.log(existUser);
      }
    });
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

      // console.log(User);
      // const u = new User({firstName: 'dan', lastName: 'dan', email: 'dan2@dan.com', password: '123', template: { blog: 'blogTemplateContents' }});
      //
      // u.save(function (user, error) {
      //   debugger
      //
      // })
    // indexHTML = path.join(__dirname, 'templates/blog', 'index.html');
    res.sendFile(path.join( __dirname, 'templates/blog', 'index.html' ));
    // res.render(indexHTML);
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: 'http://localhost:3001/theme',
    failureRedirect: 'http://localhost:3001',
  }));

  app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3001/theme',
    failureRedirect: 'http://localhost:3001',
  }));

  app.post('/blog', function(req, res, next){
    // find the token
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
    // decode the token into user id
    var decoded_user_id = jwt.decode(token, secret.jwt_secret);

    // convert regions provided to a dictionary
    var regions = JSON.parse(req.data.regions)

    // find the current user
    var user = User.findById(decoded_user_id.sub, function(err, existUser){
      if (existUser){
        // save the new contents to the db for current user
        existUser.template.blog = regions;
        existUser.save(function(err){
          if (err) {
            return next(err);
          }
        });
      }
    });

  });

  app.post('/blog-test', function(req, res, next){
    // debugger
    console.log(req.body);

    var fixed_user_id = "584df9b62fae324a6eeab438";
    var user = User.findById(fixed_user_id, function(err, existUser){
      if (existUser){
        console.log("user found");
        existUser.template = {blog: req.body};
        existUser.save(function(err){
          if(err){
            return next(err);
          }
        });
        // console.log(existUser.template.blog);
      }
    });
  });

  // make another ajax request from client
  // for example, /blog-client <-- sends back the below
  // because /blog is asset
  app.get('/blog-client', function(req, res, next){
    // console.log("in blog");
    var fixed_user_id = "584df9b62fae324a6eeab438";
    var user = User.findById(fixed_user_id, function(err, existUser){
      if (existUser){
        if (existUser.template.blog){
          var edited_blog = existUser.template.blog;
          // console.log(edited_blog);
          return res.send(edited_blog);
        }else{
          console.log("none");
        }
      }
    });
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
