const mongoose = require('mongoose');

console.log(Post);

const CommunitySchema = new mongoose.Schema({
    creatorID: {
        type: String
    },
    icon: {
        type: String
    },

    description: {
        type: String
    },

    tags: {
        type: [String]
    },

    postIDs: {
        type: [String]
    },

    adminIDs: {
        type: [String]
    },

    topics: {
        type: [String]
    },

    followerIDs:{
        type: [String]
    } 
        

});

const Community = mongoose.model('Community', CommunitySchema);

module.exports = Community;