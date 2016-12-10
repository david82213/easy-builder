// main starting point of app
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path')

var app = express();
var router = require('./router');

var cors = require('cors');

var mongoose = require('mongoose');
//////////////////////////////////
// DB setup
mongoose.connect('mongodb://localhost:auth/auth');
// mongoose.connect('mongodb://localhost:auth/template');

//////////////////////////////////
// App setup

// middleware express
app.use(cors());
// morgan is console input logging framework

// json method
// app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/templates'))

// console.log("path", path.join(__dirname, '/templates'))

// json method
// app.set('views', path.join(__dirname, '/templates'))
// app.set('view engine', 'ejs')

// app.use(express.static( __dirname + '/templates' ));
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
