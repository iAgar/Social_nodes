const Post = require('../models/post');

module.exports.home = function(req, res){
    
    //this function populates the user of each post
    Post.find({})
    .populate('user')
    .populate({ //nested populate
        path: 'comment', 
        populate: {
            path: 'user'
        }})
    .exec(function(err, posts){
        return res.render('home', {
            title: "Social Nodes",
            post: posts
        });
    })
}