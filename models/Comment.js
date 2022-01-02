const mongoose = require("mongoose");
const Post = require("../models/Post");

const CommentSchema = new mongoose.Schema({
    commentAuthor: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
    },
    post: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'} 
    },
    commentBody: {
        type: String,
        required: true
    },
    commentLikes: {
        type: Number,
        default: 0            
    },
    replies: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;