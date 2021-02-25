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
        req.flash('err', 'The passwords did not match');
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
    req.flash('success', 'You have logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out successfully');
    return res.redirect('/');
}

module.exports.profile = async function(req, res){

    try{
        let user = await User.findById(req.params.id);
        let posts = await Post.find({}).populate('user').populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        });
        
        return res.render('profile',{
                title: 'Social Nodes | Profile',
                posts: posts,
                profile_user: user
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.update = function(req, res){
    //ensuring that the person signed in is the one whose details are to be updated
    //else anyone can change the id in the form and update someone else's details
    if(req.user.id == req.params.id) 
    { 
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Your details have been updated!');
            return res.redirect('back');
        });
    }else{
        res.status(401).send('Unauthorised');
    }
}