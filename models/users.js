//Mongoose is required for Schemas
var mongoose = require('mongoose');
//dogs property of UserSchema requires DogSchema in dogs.js model
 
var User = require ('./dogs').schema;
var Dog = require('./dogs').schema
var dogSchema = require('./dogs').schema
var customerSchema = require('./customers').schema;
//BCrypt is required for assigning a hashed password upon creation of new User
var bcrypt = require('bcrypt-nodejs');

//User credentials and subdocumenting of dogSchema

var userSchema = mongoose.Schema({
	
	username: String,
	email: String,
	password: String,
	dogs: [dogSchema]
});



//generateHash method of User is invoked in our passportconfig: defined by bcrypt hashing functionality
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Bcrypt compares password of User - invoked in Config
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

//Export User

module.exports = mongoose.model('User', userSchema);
 
 
 
