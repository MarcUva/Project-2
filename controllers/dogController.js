var express = require('express'),
    //call an instance of the Router for creating our frontend routes for our application.
    router  = express.Router();

var User    = require('../models/users'),
 Dog        =  require('../models/dogs');

// Render dogs index page by finding dogs in Dog model and sending to view
router.get('/', isLoggedIn, function(req, res) {
    Dog.find(function(err, dogs) {
        res.render('dogs/index.ejs', { dogs: dogs });
    });
});

 
//Is the User logged in?  Check with passport authentication
//call next() to move on to the next middleware 
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