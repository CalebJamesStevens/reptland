const mongoose = require('mongoose');
const User = require('./User').schema
const user = require('./User')

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
    enrichment: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    community: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Community'
    },
    communityTopic: {
        type: String
    },
    tags: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;