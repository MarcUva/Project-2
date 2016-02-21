//REQS//
var express  = require('express'),
	passport = require('passport'),
	//router = express' Router
    router   = express.Router();

//Declare variables and require their model
var User     = require('../models/users'),
    Dog      = require('../models/dogs');
    Customer = require ('../models/customers')

//render Users Index page after authentication
router.get('/', function(req, res) {
	res.locals.login = req.isAuthenticated();
	User.find(function(err, users) {
		res.render('users/index.ejs', { users: users });
	});
});
 


// json for all users (for testing)
router.get('/json', function(req, res) {
	User.find(function(err, users) {
		res.send(users);
	});
});

// json for specific user 
router.get('/:id/json', function(req, res) {
	User.findById(req.params.id, function(err, user) {
		res.send(user);
	});
});

// logout of session
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users');
});

// show page for individual users requires authentication of sign in
router.get('/:id', isLoggedIn, function(req, res) {
		// Only when id param matches the user request (and after authentication) -  show user's individual show page.
		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		//Find User by ID and render show page - pass user object
		User.findById(req.params.id, function(err, user) {
			res.render('users/show.ejs', { user: user });
		});
});

// routes the creation of new Dog and pushes it to User dog property to attribute ownership
// Uses subdocumenting of dogschema
router.post('/:id/newdog', function(req, res) {
	User.findById(req.params.id, function(err, user) {
		var dog = new Dog(req.body);
		
		dog.save(function(err, dog) {
			user.dogs.push(dog);
			user.save(function(err, user) {
				res.redirect('/users/' + req.params.id);
			});			
		});
	});
});

router.get('/', passport.authenticate('local-signup', { 
	failureRedirect: '/users' }), function(req, res) {
    //success redirect goes to show page
    res.redirect('/users/' + req.user.id);
});

 
 

// Create user w/ our sign-up strategy
router.post('/', passport.authenticate('local-signup', { 
	failureRedirect: '/users' }), function(req, res) {
    //success redirect goes to show page
    res.redirect('/users/' + req.user.id);
});

// Log user in with Login strategy
router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/users' }), function(req, res) {
  	res.redirect('/users/' + req.user.id);
});

// Allow Deletion for User param and User's Dog
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

//isLoggedin function invoked in show route - checks authentication of user before showing page
function isLoggedIn(req, res, next) {
	console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
  	return next(); 
  } else {
  	res.redirect('/users');
  }
}

module.exports = router;