//REQS//
var express  = require('express'),
	passport = require('passport'),
	//router = express' Router
    router   = express.Router();

//Declare User and Dog variables and require their model
var User     = require('../models/users'),
    Dog      = require('../models/dogs');

// User index page requires authentication
// Render the user's page and pass users object
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

// show page foor individual users requires authentication of sign in
router.get('/:id', isLoggedIn, function(req, res) {
		// Only when id param matches the user request (and after authentication) -  show user's individual show page.
		req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
		//Find User by ID and render show page - pass user object
		User.findById(req.params.id, function(err, user) {
			res.render('users/show.ejs', { user: user });
		});
});

// saves a new dog in the database w/ req.body contingency to DogSchema
// push new dog into user's "dog" property - subdocumenting
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
	console.log('Delete Route');
	User.findById(req.params.id, function(err, user) {
		if (user.dogs.length == 0) {
			user.remove(function(err) {
				res.redirect('/users');
			});
		} else {
			user.dogs.forEach(function(location) {
				Location.findOneAndRemove({ _id: dog.id }, function(err) {
					if (err) console.log(err);
				});
			});
			user.remove(function(err) {
				res.redirect('/users');
			});
		}  
	});  
});

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