const mongoose = require("mongoose");
const Post = require("../models/Post");

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post' 
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment',
        default: null
    },
    body: {
        type: String,
        required: true
    },
    enrichment: {
        type: Number,
        default: 0            
    },
    replies: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;