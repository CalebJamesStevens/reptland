const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String
    },
    bio: {
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
    enrichedPosts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    },
    friends: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    friendRequests: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    sentFriendRequests: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    followedUsers: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    followers: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;