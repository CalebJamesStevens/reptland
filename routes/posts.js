const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb');
const { redirect } = require("express/lib/response");
const Community = require("../models/Community");




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

router.get('/new-post', async (req, res) => {
    if (!res.locals.currentUser) {
        res.redirect('/users/sign-up')
        return;
    }

    let userCommunities = new Array();

    await User.findById(res.locals.currentUser._id)
            .populate({
                path:'communities',
                populate: {
                    path:'topics'
                }
            })
            .exec((err, user) => {
                userCommunities = user.communities
                res.render('../views/posts/new-post', {communities: userCommunities})
            })
            

})


router.post('/new-post', (req, res) => {
    const details = req.body;
    const newPost = new Post({
        title: details.title,
        authorID: res.locals.currentUser._id
    });
    
    console.log(details)

    if (details.body) {
        newPost.body = details.body;
    }
    if (details.community != "") {
        newPost.community = details.community;
        if (!details.communityTopic) {
            newPost.communityTopic = 'general';
        }
    }
    if (details.communityTopic) {
        newPost.communityTopic = details.communityTopic;
    }
    if (details.tags) {
        newPost.tags = details.tags;
    }

    newPost.save()
        .then(post => {
            
            User.updateOne({_id: res.locals.currentUser._id}, {$push: {posts: post._id}})
                .then(user => {
                    Community.updateOne({_id: post.community}, {$push: {posts: post._id}})
                        .then(res.redirect(`/posts/${post.id}`))
                    
                })
            
        })

})

router.get(`/:postID/enrich-post`, async (req, res) => {
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

router.post(`/:postID/save-post`, async (req, res) => {
    console.log(req.params.postID)
    if (!res.locals.currentUser) {
        res.redirect(`/posts/${req.params.postID}`)
        return;
    };
    if (res.locals.currentUser.savedPosts.includes(req.params.postID)) {
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {savedPosts: req.params.postID}})
        res.redirect(`/posts/${req.params.postID}`)
    } else {
        await User.updateOne({_id: res.locals.currentUser._id}, {$push: {savedPosts: req.params.postID}})
        res.redirect(`/posts/${req.params.postID}`)
        console.log("Saved")
    }
    
})

router.get(`/view-post/:postID`, async (req, res) => {
    console.log('going to post')
    await Post.findOne({_id: req.params.postID})
        .populate('authorID')
        .populate('community')
        .populate({
            path: 'comments',
            populate: {
                path: "commentAuthor"
            }
        })
        .exec((err, post) => {
            res.json(post);
        })
}) 

module.exports = router; 