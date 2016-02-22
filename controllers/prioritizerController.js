//REQS//
var express  = require('express'),
 
	//router = express' Router
    router   = express.Router();

//Declare variables and require their model
var User     = require('../models/users'),
    Dog      = require('../models/dogs'),
    Customer = require('../models/customers');

//     router.get('/', function(req, res) {
//     Dog.find(function(err, dogs) {
//         res.render('dogs/prioritizer.ejs', { dogs: dogs });
//     });
// });

//     router.get('/users/jsondogs/:id',function(req,res){
//     Dogs.find({'age': req.params.age}).sort({'age': -1}).exec(function(err,dogs) {
//     if(err)
//         res.send(err);
//     res.json(dogs);
// // });
router.get('/', function(req, res){

Dog.find({age: 2}, function(err, dogs){
    res.render('dogs/prioritizer.ejs', { dogs: dogs });
    });
})


    module.exports = router;


