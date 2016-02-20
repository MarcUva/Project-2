//REQS//
var express  = require('express'),
	passport = require('passport'),
	//router = express' Router
    router   = express.Router();

//Declare variables and require their model
var User     = require('../models/users'),
    Dog      = require('../models/dogs'),
    Customer = require('../models/customers');

 
// INDEX
router.get('/', function(req, res) {
	 Dog.find(function(err, dogs) {
		res.render('customers/index.ejs', { dogs: dogs });
	});
});




module.exports = router;