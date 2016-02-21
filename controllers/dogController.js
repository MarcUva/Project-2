//REQS//
var express = require('express'),
    router  = express.Router();
var LocalStrategy   = require('passport-local').Strategy;
var User    = require('../models/users'),
    Dog        =  require('../models/dogs'),
    PublicDog  =  require('../models/dogs'),
    Customer  = require('../models/customers');
    passport = require('passport'),

// Render dogs index page after authentication by sending Dog model to view
router.get('/', isLoggedIn, function(req, res) {
    Dog.find(function(err, dogs) {
        res.render('dogs/show.ejs', { dogs: dogs });
    });
});



router.delete('/:id', function(req, res) {
 var userid = req.params.id;
  User.findById(userid, function(err, data) {
    for (var i = 0; i < data.dogs.length; i++) {
      User.findByIdAndRemove(data.dogs[i].id, function(err, data) {
        console.log(data);
      });
    };
    User.findByIdAndRemove(userid, function(err, data) {
      res.redirect('/users');
    })
  })
})
 
//check if user is authenticated

router.get("/jsondogs", function(req, res){
  Dog.find({}, function(err, dogs) {
    if (err) console.log(err);
      res.json(dogs);
  });
})

 
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