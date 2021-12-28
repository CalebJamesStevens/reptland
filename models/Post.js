const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorID: {
        type: String,
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
    commentIDs: {
        type: [String]
    },
    communityID: {
        type: String
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