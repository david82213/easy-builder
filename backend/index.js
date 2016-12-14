// main starting point of app
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path')

var app = express();
var router = require('./router');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');
var expressValidator = require('express-validator');

var cors = require('cors');

var mongoose = require('mongoose');
//////////////////////////////////
// DB setup
mongoose.connect('mongodb://localhost:auth/auth');
// mongoose.connect('mongodb://localhost:auth/template');
mongoose.connection.on('connected', function(){
  console.log('Mongoose connectedto ' + 'auth table');
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose dc');
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error: ' + err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function() {
    console.log('Mongoose dc through app termination (SIGINT)');
    process.exit(0);
  });
});
process.on('SIGTERM', function(){
  mongoose.connection.close(function() {
    console.log('Mongoose dc through app termination (SIGTERM)');
    process.exit(0);
  });
});
// process.on('SIGUSR2', function(){
//   mongoose.connection.close(function() {
//     console.log('Mongoose dc through app termination (SIGUSR2)');
//     process.kill(process.pid, 'SIGUSR2');
//   });
// });

//////////////////////////////////
// App setup

// middleware express
app.use(cors());
app.use(session({ secret: 'SECRET' }));
// morgan is console input logging framework

// json method
// app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/uploads'));

// console.log("path", path.join(__dirname, '/templates'))

// json method
// app.set('views', path.join(__dirname, '/templates'))
app.set('view engine', 'ejs')

// app.use(express.static( __dirname + '/templates' ));
app.use(morgan('combined'));
// bodyParser is parse incoming requests into json no matter the type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());
router(app);

/////////////////////////////////
// server setup
var port = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
