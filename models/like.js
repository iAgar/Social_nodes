const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    //this defines the objectid of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        //this is for dynamic referencing 
        //this will determine the type of object on which like has been placed
        refPath: 'onModel'
    },
    //this field is used for defining the path of the liked object
    onModel: {
        type: String, 
        require: true,
        //enum limits the values which likeable can take
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;