const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comment_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({content: req.body.content, user: req.user.id, post: req.body.post});
            
            post.comment.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();

            //this function call needs to go inside the queue
            //creating a new job in the queue
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('Error in creating a queue', err);
                    return;
                }

                console.log(job.id);
            })
            //commentsMailer.newComment(comment);

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment: comment,
                        user: req.user
                    },
                    message: 'Comment Created!'
                })    
            }

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