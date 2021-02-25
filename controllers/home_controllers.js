const Post = require('../models/post');

module.exports.home = async function(req, res){
    
    try{
        //this function populates the user of each post
        let posts = await Post.find({})
        .populate('user')
        .populate({ //nested populate
            path: 'comment', 
            populate: {
                path: 'user'
            }});

        return res.render('home', {
            title: "Social Nodes",
            post: posts
        });
    }catch(err){
        console.log("Error", err);
        return;
    }
}