const Post = require('../models/post');

module.exports.home = async function(req, res){
    
    try{
        //this function populates the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({ //nested populate
            path: 'comment', 
            populate: {
                path: 'like'
            },
            populate: {
                path: 'user'
            }
        }).populate('like');

        return res.render('home', {
            title: "Social Nodes",
            post: posts
        });
    }catch(err){
        console.log("Error", err);
        return;
    }
}