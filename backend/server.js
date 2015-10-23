// =======================
// get the packages we need
// =======================
var express     = require('express');
var app         = express();
var apiRoutes 	= express.Router(); 
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var API 		= require("./Authentication.js");
var jwt    		= require('jsonwebtoken');
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', apiRoutes);
app.use(express.static('../client'));

// =======================
// basic routes ==========
// =======================


// test route
app.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// =======================
// Authenticated routes ==
// =======================
app.use(function(req, res, next) {
	API.Authenticate(req, res, next);
});


app.get('/me', function(req, res) {
	API.User(req.decoded, req, res);
});





// =======================
// api routes ============
// =======================
apiRoutes.post('/login', function(req, res) {
	API.Login(req.body.username, req.body.password, req, res);
});
apiRoutes.post('/register', function(req, res) {
	API.Register(req.body.username, req.body.email, req.body.password, req, res);
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);