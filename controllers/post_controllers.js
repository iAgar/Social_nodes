const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let posts = await Post.create({content: req.body.content, user: req.user._id});
        req.flash('success', 'Post created successfully!');
        return res.redirect('back');
    }catch(err){
        console.log('Error in creating post', err);
        return;
    }
}

module.exports.delete = async function(req, res){
    try{
        let posts = await Post.findByIdAndDelete(req.params.id)

        let comments = await Comment.deleteMany({post: req.params.id})
        req.flash('success', 'Post deleted successfully!');
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
}