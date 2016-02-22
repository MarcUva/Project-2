//Mongoose required for schemas//
var mongoose = require('mongoose');
 

var dogSchema =  mongoose.Schema({

	name: String,
	breed: String,
	size: String,
	age: Number,
	timeinshelter: Number,
	postingdate: { type : Date, default: Date.now },
 	urgency: Number,
 	status: String,
 	img: String,
 	comments:String,
 
})

 
module.exports = mongoose.model('Dog', dogSchema);
 
 

 