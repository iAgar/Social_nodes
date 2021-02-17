const Post = require('../models/post');
const User = require('../models/user');

module.exports.create = function(req, res){
    Post.create({content: req.body.content, user: req.user._id}, function(err, Post){
        if(err){
            console.log('Error in creating a post', err);
            return res.redirect('back');
        }

        return res.redirect('back');
    })
}