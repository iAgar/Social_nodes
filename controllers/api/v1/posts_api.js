const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({ //nested populate
            path: 'comment', 
            populate: {
                path: 'user'
            }});

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.delete = async function(req, res)
{
    try{
        let posts = await Post.findByIdAndDelete(req.params.id)

    let comments = await Comment.deleteMany({post: req.params.id})

    return res.status(200).json({
        data:{
            data: req.params.id
        },
        message: 'Post and associated comments deleted'
        })
    }catch(err){
        return res.json(500, {message: "Internal Server Error"});
    }
    
}