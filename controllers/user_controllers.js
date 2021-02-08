const User = require('../models/user_schema');

module.exports.signUp = function(req, res){
    return res.render('sign-up', {
        title: 'Sign Up'
    });
}

module.exports.signIn = function(req, res){
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
