const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb');
const { redirect } = require("express/lib/response");




router.post('/:postID/delete', async (req, res) => {
    console.log("GOT THIS FAR")
    try {
        console.log("Starting post deletion")
        await Post.findById({_id: req.params.postID}, (err, post) => {
            console.log("Starting post deletion")
            try {
                if (!post.authorID._id.equals(res.locals.currentUser._id)) {
                    res.redirect(`/posts/${req.params.postID}`)
                    return;
                } 
            } catch {
                res.redirect(`/posts/${req.params.postID}`)
                return;
            }
        }).clone()
        console.log("Post deleted")
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {posts: req.params.postID}})
        await Post.deleteOne({_id: req.params.postID})
        res.redirect(`/`)
        
    } catch (err){
        console.log(err)
    
        res.redirect(`/`)
    }
})

router.get('/new-post', (req, res) => res.render('../views/posts/new-post'))


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

router.get(`/enrich-post/:postID`, async (req, res) => {
    console.log(req.params.postID)
    if (!res.locals.currentUser) {
        res.redirect(`/posts/${req.params.postID}`)
        return;
    };
    if (res.locals.currentUser.likedPosts.includes(req.params.postID)) {
        await Post.updateOne({_id: req.params.postID}, {$inc: {enrichment: -1}})
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {likedPosts: req.params.postID}})
        res.redirect(`/posts/${req.params.postID}`)
    } else {
        await Post.updateOne({_id: req.params.postID}, {$inc: {enrichment: 1}})
        await User.updateOne({_id: res.locals.currentUser._id}, {$push: {likedPosts: req.params.postID}})
        res.redirect(`/posts/${req.params.postID}`)
        console.log("Enriched")
    }
    
})

router.get(`/:postID`, (req, res) => {
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

module.exports = router; 