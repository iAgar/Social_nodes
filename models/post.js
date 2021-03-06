const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //this type is a reference
        ref:'User' //Mongo assumes that ref refers to a model name
    },
    //this array of ids of comments is included to print the associated comments along side the post 
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'        
    }]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;