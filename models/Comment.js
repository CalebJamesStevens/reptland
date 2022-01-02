const mongoose = require("mongoose");
const Post = require("../models/Post");

const CommentSchema = new mongoose.Schema({
    commentAuthor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post' 
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