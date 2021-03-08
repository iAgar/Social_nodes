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

    return res.status(200).json({
        message: "List of posts",
        posts: posts
    })
}

module.exports.delete = async function(req, res)
{
    try{
        let post = await Post.findById(req.params.id);
        console.log(req);
        console.log(post.user);
        console.log(req.user.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id})

            return res.status(200).json({
                data:{
                    data: req.params.id
                },
                message: 'Post and associated comments deleted'
            })
        }else{
            return res.status(401).json({
                message: "You cannot delete this post"
            })
        }
    }catch(err){
        console.log('Error', err);
        return res.json(500, {message: "Internal Server Error"});
    }
    
}