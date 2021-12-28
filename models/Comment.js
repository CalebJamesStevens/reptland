const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    commentAuthorID: {
        type: String 
    },
    commentBody: {
        type: String,
        required: true
    },
    commentLikes: {
        type: Number,
        default: 0            
    },
    replyIDs: {
        type: [String]
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;