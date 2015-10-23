var Parse = require('parse/node').Parse;
var jwt    = require('jsonwebtoken');
Parse.initialize("sLl21YQKO0Fj3o0NmiiZj47TsYUJzBj3HiFPOmHZ", "bb1DHOWS0XPWCEF5SQ7xop3MHpiDplHwWY2ryj3n");

module.exports = {

  Register: function(username, email, password, req, res){
  	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	user.set("email", email);

	user.signUp(null, {
	  success: function(user) {
	    res.json({
          success: true,
          message: 'Thanks for registering!'
        });
	  },
	  error: function(user, error) {
	   	res.json({
          success: false,
          message: error
        });
	  }
	});

  },

  Login: function(username, password, req, res){
  	Parse.User.logIn(username, password, {
	  success: function(user) {
	    var token = jwt.sign(user, 'iliogr', {
          expiresIn: 10000 // expires in 24 hours
        });
	 	res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
	  },
	  error: function(user, error) {
	   	res.json({
          success: false,
          message: 'Authentication Failed'
        });
	  }
	});
  },

  User: function(username, req, res){
	var query = new Parse.Query(Parse.User);
	query.equalTo("username", req.decoded.username);
	query.find({
	  success: function(user) {
	   	res.json({
          success: true,
          message: user
        });
	  }
	});
  },

  Authenticate: function(req, res, next){
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  if (token) {
	    jwt.verify(token, 'iliogr', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        req.decoded = decoded;    
	        next();
	      }
	    });

	  } else {
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	  }
  }
};