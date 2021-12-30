const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    commentAuthor: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
    },
    commentBody: {
        type: String,
        required: true
    },
    commentLikes: {
        type: Number,
        default: 0            
    },
    replys: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;