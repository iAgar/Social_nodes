const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    function(req, email, password, done) {
        User.findOne({ email: email}, function (err, user) 
        {
            if (err){
                return done(err); 
            }

            if(!user || user.password!=password ){
                req.flash('err', 'Incorrect email or pasword');
                return done(null, false, { message: 'Incorrect email or password' });
            }

            return done(null, user);
        });
    }
));

//serializeUser picks out the info from the user which needs to be set up in the session cookie
passport.serializeUser(function(user, done){
    //this stores users id in the session cookie 
    done(null, user.id);
});
  

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        if(err){console.log('Error in finding user -> Passport'); return done(err)}
        return done(null, user);
    });
});

//middleware
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}

//middleware
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    //stores user data in locals.user so that it can be accessed in views
    next();
}

module.exports = passport;