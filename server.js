//REQS//

var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    port           = 3000 || process.env.PORT,
    session        = require('express-session'), 
    app            = express();
    passport       = require('passport');

//MONGOOSE//
mongoose.connect('mongodb://localhost/project2');


//static files//
app.use(express.static('public'));

//REQ Passport for authentication 
require('./config/passport')(passport);

//REQ body-parser to parse posts//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Initiate Passport
app.use(session({ name: 'shelter_auth', secret: 'Hello, my name is Marc' }));
app.use(passport.initialize());
app.use(passport.session());

//Controllers
shelterController = require('./controllers/shelterController');


//method override for req.body 
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//route shelter uri w/ controller
app.use('/shelter', shelterController);

//redirect root to shelter
app.get('/', function(req, res) {
    res.redirect('/shelter');
});


//Listen
app.listen(port, function() {
console.log('Running on port ' + port);
  
});