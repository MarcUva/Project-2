//REQS//
var express = require('express'),
    router  = express.Router();

var User    = require('../models/users'),
    Dog        =  require('../models/dogs'),
    Customer  = require('../models/customers');

// Render dogs index page after authentication by sending Dog model to view
router.get('/', isLoggedIn, function(req, res) {
    Dog.find(function(err, dogs) {
        res.render('dogs/index.ejs', { dogs: dogs });
    });
});

 
//check if user is authenticated
 
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}

//export router
module.exports = router;