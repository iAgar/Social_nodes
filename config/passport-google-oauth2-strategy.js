const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: "*",
    clientSecret: "*",
    callbackURL: "http://localhost:8000/user/auth/google/callback"
  },
  //accessToken is given by google
  //refreshToken is used to get a new accessToken when the old one expires
  function(accessToken, refreshToken, profile, done) {
    //Checking if the user that has the same email id as the first one in email array exists in the db
    //user can have multiple emails on google, hence we are considering an array
    User.findOne({ email: profile.emails[0].value }).exec(function(err, user)
    {
        if(err)
        {
            console.log('Error in Google Strategy', err);
            return;
        }

        console.log(profile);

        if(user){
            //if found, set this user as req.user i.e sign in that user
            return done(null, user);
        }else{
            //if not found, create that user and set it as req.user i.e sign in that user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value, 
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('Error in creating a user', err);
                        return;
                    }

                    return done(null, user);
                })
        }
    });
  }
));

module.exports = passport;