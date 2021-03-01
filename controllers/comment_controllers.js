const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({content: req.body.content, user: req.user._id, post: req.body.post});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment: comment,
                        user: req.user
                    },
                    message: 'Comment Created!'
                })    
            }

            post.comment.push(comment);
            post.save();

    }

        req.flash('success', 'Comment created successfully');
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.delete = async function(req, res){
    try{
        let comment = await Comment.findByIdAndDelete(req.params.id);
        req.flash('success', 'Comment deleted successfully');
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
        return;
    }
}