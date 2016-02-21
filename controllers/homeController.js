 //REQS//
var express = require('express'),
    router  = express.Router();

var User    = require('../models/users'),
    Dog        =  require('../models/dogs'),
    Customer  = require('../models/customers');


   router.get('/', function(req, res) {

	User.find(function(err, users) {
	res.render('home/index.ejs', { users: users });
	});
});
 
//export router
module.exports = router;