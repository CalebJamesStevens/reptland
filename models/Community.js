const mongoose = require('mongoose');

console.log(Post);

const CommunitySchema = new mongoose.Schema({
    creator: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
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

    posts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    },

    admins: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    },

    topics: {
        type: [String]
    },

    followers:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    } 
        

});

const Community = mongoose.model('Community', CommunitySchema);

module.exports = Community;