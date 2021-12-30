const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')


router.get('/new-post', (req, res) => res.render('../views/posts/new-post'))

router.get(`/:postID`, (req, res) => {
    /*Post.findOne({_id: req.params.postID}, (err, docs) => {

        res.render(
            '../views/posts/view-post', 
            {
                post: docs
            }
        );
    })*/
    Post.findOne({_id: req.params.postID})
        .populate('authorID')
        .exec((err, post) => {
            res.render(
                '../views/posts/view-post', 
                {
                    post: post
                }
            );
        })
}) 

router.post('/new-post', (req, res) => {
    const details = req.body;
    const newPost = new Post({
        title: details.title,
        authorID: res.locals.currentUser._id,
        author: res.locals.currentUser
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
            res.redirect(`/posts/${post.id}`)
        })

})

module.exports = router;