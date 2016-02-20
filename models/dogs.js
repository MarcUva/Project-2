//Mongoose required for schemas//
var mongoose = require('mongoose');

var dogSchema = mongoose.Schema({
	name: String,
	breed: String,
	
})

module.exports = mongoose.model('dogs', dogSchema);