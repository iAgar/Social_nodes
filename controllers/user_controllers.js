const User = require('../models/user');
const Post = require('../models/post');
const fs = require("fs");
const path = require('path');

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

module.exports.update = async function(req, res){
    
    //ensuring that the person signed in is the one whose details are to be updated
    //else anyone can change the id in the form and update someone else's details
    if(req.user.id == req.params.id) 
    { 
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            //the form data wont be accessible from req.params as the update form is a multipart form
            //hence to access the req, we use the static function defined in user model
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer error', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(req.file.mimetype=='image/jpeg'){
                        if(user.avatar){
                            if(fs.existsSync(path.join(__dirname, '..', user.avatar)))
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                        //this is saving the path of the uploaded file into the avatar field of the user
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }
                    else{
                        req.flash('err', 'Incorrect file type. only JPG is allowed');
                        return res.redirect('back');
                    }
                }
                user.save();
                req.flash('success', 'Details updated successfully');
                return res.redirect('back');
            });
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
        /*User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Your details have been updated!');
            return res.redirect('back');
        });*/
    }else{
        req.flash('error', err);        
        res.status(401).send('Unauthorised');
    }
}