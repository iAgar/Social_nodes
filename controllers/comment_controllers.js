const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({content: req.body.content, user: req.user._id, post: req.body.post}, function(err, Comment){
                if(err){
                    console.log('Error in creating a comment', err);
                    return res.redirect('back');
                }
            
                post.comment.push(Comment);
                post.save();
        
                return res.redirect('back');
            })
        }
    })
}

module.exports.delete = function(req, res){
    Comment.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log('Error in deleting the comment', err);
            return res.redirect('back');
        }
        
        return res.redirect('back');
    })
}