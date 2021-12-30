const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
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
        authorID: res.locals.currentUser._id
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
            console.log(res.locals.currentUser._id)
            console.log(post._id)
            User.updateOne({_id: res.locals.currentUser._id}, {$push: {posts: post._id}})
                .then(res.redirect(`/posts/${post.id}`))
            
        })

})

module.exports = router;