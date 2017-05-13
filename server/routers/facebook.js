var express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FB = require('fb');
const fbAuth = require('../facebookAuth')(passport);
var router = express.Router();

//Passport session settings
router.use(session({
  secret: 'InYourFace', // session secret
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions
router.use(bodyParser.json());



router.route('/getDetails').get(function(req, res) {
  FB.setAccessToken(req.query.token);
  FB.api('/me?fields=email,picture', function(response) { 
    res.send(response);
  });

});

//Get user's friends Details
router.route('/getFriendsDetails').get(function(req, res) {
  FB.setAccessToken(req.query.token);
  FB.api('/me?fields=taggable_friends{picture.width(250),name}', function(response) {
    res.send(response.taggable_friends.data);
  });
  

});
module.exports = router;