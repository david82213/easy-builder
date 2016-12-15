var Authentication = require('./controllers/authentication');
var passport = require('passport');
var passportConfig = require('./services/passport');
var _ = require('lodash');

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

var JSZip = require("jszip");
var archiver = require('archiver');
var ejs = require('ejs');

var multer = require('multer');
// var upload = multer({ dest: './uploads/'});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    var name = file.originalname.split('.');
    cb(null, name[0] + '-' + Date.now() + path.extname(file.originalname));
    // crypto.pseudoRandomBytes(16, function (err, raw) {
    //   cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    // });
  }
})

var upload = multer({ storage: storage })

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}


var blogDefaults = {
  contents1: `<ul class=\"nav navbar-nav navbar-right\">
                <li>
                    <a href=\"index.html\">Home</a>
                </li>
                <li>
                    <a href=\"about.html\">About</a>
                </li>
                <li>
                    <a href=\"post.html\">Sample Post</a>
                </li>
                <li>
                    <a href=\"contact.html\">Contact</a>
                </li>
              </ul>`,
  contents2: `<h1>Clean Blog</h1>
              <hr class=\"small\">
              <p class=\"subheading\">A Clean Blog Theme by Start Bootstrap</p>`,
  contents3: `<h2 class=\"post-title\">
                <a href=\"post.html\">
                    Man must explore, and this is exploration at its greatest
                </a>
              </h2>
              <h3 class=\"post-subtitle\">
                  Problems look mighty small from 150 miles up
              </h3>
              <p class=\"post-meta\">Posted by <a href=\"#\">Start Bootstrap</a> on September 24, 2014</p>`,
  contents4: `<h2 class=\"post-title\">
                <a href=\"post.html\">
                  I believe every human has a finite number of heartbeats. I don\'t intend to waste any of mine.
                </a>
              </h2>
              <p class=\"post-meta\">Posted by <a href=\"#\">Start Bootstrap</a> on September 18, 2014</p>`,
  contents5: `<h2 class=\"post-title\">
                <a href=\"post.html\">
                  Science has not yet mastered prophecy
                </a>
              </h2>
              <h3 class=\"post-subtitle\">
                  We predict too much for the next year and yet far too little for the next ten.
              </h3>
              <p class=\"post-meta\">Posted by <a href=\"#\">Start Bootstrap</a> on August 24, 2014</p>`,
  contents6: `<h2 class="post-title">
                <a href="post.html">
                  Failure is not an option
                </a>
              </h2>
              <h3 class="post-subtitle">
                Many say exploration is part of our destiny, but it’s actually our duty to future generations.
              </h3>
              <p class="post-meta">Posted by <a href="#">Start Bootstrap</a> on July 8, 2014</p>`,
  contents7: `<ul class="pager">
                <li class="next">
                    <a href="#">Older Posts &rarr;</a>
                </li>
              </ul>`
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

  app.get('/blog', function(req, res, next){
    var fixed_user_id = "5851b9235539a2cd7e65e72e";
    var user = User.findById(fixed_user_id, function(err, existUser){
       if (existUser){
         if (existUser.template.blog !== void 0) {
           var keys = Object.keys(existUser.template.blog);
           var arr_contents = {};
           for (var i = 0; i < keys.length; i++) {
             arr_contents[keys[i]] = existUser.template.blog[keys[i]];
           }
        //  var contents5 = existUser.template.blog['contents5'];
          // console.log(arr_contents);
        }
       }


       indexHTML = path.join(__dirname, 'templates/blog', 'index.ejs');
      //  res.render(indexHTML, _.merge({}, blogDefaults, {contents5: contents5}));
       res.render(indexHTML, _.merge({}, blogDefaults, arr_contents));
     });

  });

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

  app.post('/blog-image', upload.single('image'), function (req, res, next) {
    // debugger
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(req.file);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>')

    // res.status(204).end();
    // console.log(req.file);
    res.send(req.file);
    // res.send(req.path);
  });

  app.post('/blog-test', function(req, res, next){
    // debugger
    // console.log(Object.keys(req.body));
    var keys = Object.keys(req.body);

    var fixed_user_id = "5851b9235539a2cd7e65e72e";
    // var fixed_user_id = "5850801ef08d802aefeb5472";

    User.findOne(
      {_id: fixed_user_id},
      function (err, user) {
        // debugger
        // console.log(user.template.blog['contents5']);
        // user.template.update({blog: req.body});
        user.template.blog = Object.assign({}, user.template.blog, req.body);

        user.save(function(err, user) {
          // console.info('🆘 👉',err)
          if (err) {
            res.json({error: 'save fail'});
          } else {
            res.json({result: 'ok'});
          }
        });

        console.info(user.template.blog);
      }
    );
  });

  // make another ajax request from client
  // for example, /blog-client <-- sends back the below
  // because /blog is asset
  app.get('/blog-client', function(req, res, next){
    // console.log("in blog");
    var fixed_user_id = "5851b9235539a2cd7e65e72e";
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

  function generateArchive(index_ejs, res) {
    // var output = fs.createWriteStream(__dirname + '/zips/blog.zip');
    var archive = archiver('zip', {
        store: true // Sets the compression method to STORE.
    });

    // listen for all archive data to be written
    // output.on('close', function() {
    //   console.log(archive.pointer() + ' total bytes');
    //   console.log('archiver has been finalized and the output file descriptor has closed.');
    // });
    //
    // // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });
    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', 'attachment; filename=blog.zip');

    // pipe archive data to the file
    archive.pipe(res);

    fullIndexEJS = ""
    for (var content in index_ejs) {
      // check also if property is not inherited from prototype
      fullIndexEJS += index_ejs[content]
    }

    archive.append(fullIndexEJS, { name: 'templates/blog_export/index.html' })
    archive.directory('templates/blog_export/');
    // archive.append(fullIndexEJS, { name: 'templates/blog/index2.ejs' })

    archive.finalize();
  }

  app.get('/export', function(req, res, next){
    // var zip = new JSZip();

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    var fixed_user_id = "5851b9235539a2cd7e65e72e";
    User.findById(fixed_user_id, function(err, existUser) {
       if (existUser){
         if (existUser.template.blog !== void 0) {
           var keys = Object.keys(existUser.template.blog);
           var arr_contents = {};
           for (var i = 0; i < keys.length; i++) {
             arr_contents[keys[i]] = existUser.template.blog[keys[i]];
           }
        //  var contents5 = existUser.template.blog['contents5'];
          // console.log(arr_contents);
          var editedIndexEJS = _.merge({}, blogDefaults, arr_contents);
          var fileIndex = fs.readFileSync(__dirname + '/templates/blog/index.ejs', 'ascii');
          var renderIndex = ejs.render(fileIndex, editedIndexEJS);

          // console.log("+++++++++++++++++++++++++++++++++++++++");
          // console.log(renderIndex);
          generateArchive(renderIndex, res);
        }
      }
     });

  });
}

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
