const User = require('../models/user');
const Post = require('../models/post');

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign-up', {
        title: 'Social Nodes | Sign Up'
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return res.render('sign-in', {
        title: 'Social Nodes | Sign In'
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
    Post.find({}).populate('user').exec( function(err, posts){
        return res.render('profile',{
            title: 'Social Nodes | Profile',
            posts: posts
        });
    })
}
