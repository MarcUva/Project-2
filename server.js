//REQS//
var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    session        = require('express-session'),
    port           = 3000 || process.env.PORT,
    app            = express();
//REQS//

//Connect Mongoose to MongoDB//
mongoose.connect('mongodb://localhost/shelter_app');

 //Require Passport middleware for user authentication//
require('./config/passport')(passport);

//Require Controllers//
dogController = require('./controllers/dogController');
usersController  = require('./controllers/usersController');

//Static files//
app.use(express.static('public'));

//Body Parser//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get express to initialize passport per session//
app.use(session({ name: 'shelter_app', secret: 'marcproject' }));
app.use(passport.initialize());
app.use(passport.session());

//Method override for posting to req.body//
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


//Use controllers and assign routes//

app.use('/dogs', dogController);
app.use('/users', usersController);

// redirect root to user page
app.get('/', function(req, res) {
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Listening on:' + port);
   
});