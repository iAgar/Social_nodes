const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../models/user');

var opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //this is the encryption and decryption key. every encryption and decryption passes through this.
    secretOrKey: env.jwt_secret
}

//unlike local strategy, where we matched the email and password, here we are authenticating by getting the user id from payload
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    User.findOne({id: jwtPayLoad._id}, function(err, user) {
        if (err) {
            console.log('Error in finding user from JWT', err);
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;