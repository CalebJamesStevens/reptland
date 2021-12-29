const express = require("express")
const router = express.Router();
const Post = require("../models/Post");

router.get('/new-post', (req, res) => res.render('../views/posts/new-post'))

router.post('/new-post', (req, res) => {
    const details = req.body;
    const newPost = new Post({
        title: details.title,
        authorID: currentUser.id
    });
    if (details.body) {
        newPost.body = details.body;
    }
    if (details.communityID) {
        newPost.communityID = details.communityID;
    }
    if (details.communityTopic) {
        newPost.communityTopic = details.communityTopic;
    }
    if (details.tags) {
        newPost.tags = details.tags;
    }

    newPost.save()
        .then(post => {
            res.redirect("/")
        })

})

module.exports = router;