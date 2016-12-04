// main starting point of app
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var router = require('./router');

var mongoose = require('mongoose');
//////////////////////////////////
// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

//////////////////////////////////
// App setup

// middleware express
// morgan is console input logging framework
app.use(morgan('combined'));
// bodyParser is parse incoming requests into json no matter the type
app.use(bodyParser.json({ type: '*/*' }));
router(app);

/////////////////////////////////
// server setup
var port = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
