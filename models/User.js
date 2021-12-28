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
        type: Image
    },
    pets: {
        type: Array,
        of: Array,
        of: String
    },
    postIDs: {
        type: Array,
        of: String 
    },
    communityIDs: {
        type: String
    },
    createdCommunityIDs: {
        type: String
    },
    savedPostIDs: {
        type: String
    },
    likePostIDs: {
        type: String
    },
    friendIDs: {
        type: String
    },
    followedUserIDs: {
        type: String
    },
    data: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;