//Mongoose is required for Schemas
var mongoose = require('mongoose');
//dogs property of UserSchema requires DogSchema in dogs.js model
var dogSchema = require('./dogs').schema;
var userSchema = require('./users').schema;

var customerSchema = mongoose.Schema({
	dogs: [dogSchema]
});

module.exports = mongoose.model('Customer', customerSchema);