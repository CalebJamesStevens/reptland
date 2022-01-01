const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    pets: {
        type: [[String]]
    },
    posts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    },
    communities: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Community'}]
    },
    createdCommunities: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Community'}]
    },
    savedPosts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    },
    likedPosts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    },
    friends: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    followedUsers: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    data: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;