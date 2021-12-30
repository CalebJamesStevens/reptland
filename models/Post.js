const mongoose = require('mongoose');
const User = require('./User').schema

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    body: {
        type: String
    },
    images: {
        type: [String]
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    community: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Community'}
    },
    communityTopic: {
        type: String
    },
    tags: {
        type: String
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;