const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type:String,
        required: true
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;