const User = require('../models/user');

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign-up', {
        title: 'Sign Up'
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign-in', {
        title: 'Sign In'
    });
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confPassword)
    {
        console.log("The passwords entered did not match");
        return res.redirect('back');
    }

    User.create(req.body, function(err, User){
        if(err){
            console.log('Error'. err);
            return res.redirect('back');
        }

        return res.redirect('/user/sign-in');
    });
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

module.exports.profile = function(req, res){
    return res.render('profile',{
        title: 'Profile'
    }
    );
}
