const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({content: req.body.content, user: req.user._id, post: req.body.post});
            
            post.comment.push(comment);
            post.save();
        }
    
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.delete = async function(req, res){
    try{
        let comment = await Comment.findByIdAndDelete(req.params.id);
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
}