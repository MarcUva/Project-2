//Define new user with user schema in models//
var User = require('../models/users');
//Define LocalStrategy by the strategy method in passport-local module
var LocalStrategy   = require('passport-local').Strategy;

//One function encapsulates serializing, deserializing, signups, and logins//

//passport parameter invokes serialize/deserialize function
//serialize allows browsers to store a cookie for each user.id 
//so user info can be saved and retrieved in the session
//user credentials can persist
module.exports = function(passport) {
	console.log('passport config invoked');

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
  });

 	//Strategies are used to authenticate requests//
 	//To authenticate signup request - new local strategy is used for each user//
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		
		console.log('Req.body of signup: ', req.body);
		//indOne to get email property of User: if no e-mail is found....
		User.findOne({ 'email': email }, function(err, user) {
			if (err) { return done(err) }
			if (user) { 
				return done(null, false); 
			} else {
				//create a newUser with new credentials
				//use the generateHash property we give to User (we invoke bcrypt's generate hash function to generate a pass hash)
				var newUser = new User();
				newUser.email = email;
				newUser.password = newUser.generateHash(password);
				newUser.username = req.body.username;
				newUser.save(function(err) {
					if (err) { 
						console.log(err)
						throw err
					} else {
						return done(null, newUser);
					}
				});  
			}  
		})  

	}  

	));  



	//LOGIN STRATEGY//
	//let passport module create new strategy for login authentication//
	//Recognize the following properties of login LocalStrategy
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		//Allow login if user exists and if validPassport function is true
		User.findOne({ 'email': email }, function(err, user) {
			if (err) { return done(err) }

			if (!user) {
				console.log('NO USER FOUND');
				return done(null, false);
			}

			if (!user.validPassword(password)) {
				return done(null, false);
			}

			return done(null, user);
		});  

	}  

	));  


} // end module