var facebook = require('../config/facebook');
var facebookUsers = require('../database/index');

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    facebookUsers.facebook.findById(id, function(err, user) {
      done(err, user);
    });

  });

  passport.use(new FacebookStrategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL,
  
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      facebookUsers.facebook.findOneAsync({'facebookId': profile.id})
        .then(function(user) {
          if (user) {
            //update the token
            user.token = accessToken;
            user.saveAsync()
            .then(function(res){
              done(null, user);
            })
            .catch(function(err) {
              done (err);
            });
            done(null ,user);
            
          } else {
            console.log("response from facebook", profile.emails);
            var facebookUser = new facebookUsers.facebook();
            facebookUser.facebookId = profile.id,
            facebookUser.token = accessToken,
            facebookUser.name = profile.displayName;
          //  facebookUser.email = profile.emails[0].value;
            facebookUser.saveAsync()
            .then(function (result) {
              done(null, result);
            })
            .catch(function (err) {
              done(err);
            });
          }

        })
        .catch(function(err) {
          done(err);
        });
    });
  }
));
};

