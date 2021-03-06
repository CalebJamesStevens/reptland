const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb');
const { redirect } = require("express/lib/response");
const Community = require("../models/Community");

//rate limiters
const rateLimit = require('express-rate-limit')

const newPostLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (request, response, next, options) =>
		response.status(405).send({rateError: "Too many posts in one minute!"}),
})

//File upload stuff
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const {awsUploadFile: awsUploadFile, awsGetFile: awsGetFile} = require('../s3')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})



router.get(`/:postID/get-child-comments`, async (req, res) => {
    await Post.findById(req.params.postID)
        .populate('comments')
        .exec((err, post) => {
            
            res.json(
                post.comments
                .filter(comment => comment.parentComment == null)
                .map(comment => {return comment._id})
            )
        })
})

router.post('/new-post', newPostLimiter, upload.array('images', 2), async (req, res) => {
    const details = req.body;
    details.tags = details.tags.split(',').map(tag => tag.trim()) 
    let key = [];
    
    if (req.files) {
        key = await Promise.all(req.files.map(async file => {
            const result = await awsUploadFile(file)
            await unlinkFile(file.path)
            return result.key 
        }))
    }
    


    const newPost = new Post({
        title: details.title,
        authorID: res.locals.currentUser._id,
        ...(key && {images: key})
    });
    
    



    if (details.body) {
        newPost.body = details.body;
    }
    if (details.community != " ") {
        newPost.community = details.community;
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
                    .then(res.send({id: post._id}))
                    
                })
            
        })

})

router.get ('/images/:key', async (req, res) => {

    const key = req.params.key
    try {

        const readStream = await awsGetFile(key)
        
        readStream.pipe(res)
    } catch {
        res.send({message: "File could not be found on server"})
    }
})

router.get(`/view-post/:postID`, async (req, res) => {
    const q = await req.query;
    const data ={};
    await Post.findOne({_id: req.params.postID})
        .populate('community')
        .exec((err, post) => {
            res.json(post);
        })
}) 

router.get(`/:postID/enrich-post`, async (req, res) => {
    
    if (!res.locals.currentUser) {
        res.redirect(`/posts/${req.params.postID}`)
        return;
    };
    if (res.locals.currentUser.enrichedPosts.includes(req.params.postID)) {
        await Post.updateOne({_id: req.params.postID}, {$inc: {enrichment: -1}})
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {enrichedPosts: req.params.postID}})
    } else {
        await Post.updateOne({_id: req.params.postID}, {$inc: {enrichment: 1}})
        await User.updateOne({_id: res.locals.currentUser._id}, {$push: {enrichedPosts: req.params.postID}})
        
    }

    res.json({message: 'Success'})
    
})

router.post(`/:postID/save-post`, async (req, res) => {
    
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
        
    }
    
})



router.get(`/popular-posts`, async (req, res) => {
    await Post.find(
        {community: {$exists: true}}
    )
    .then (posts => {
        res.json(posts)
    })

})


router.delete('/:postID', async (req, res) => {
    
    try {
        let post = await Post.findById({_id: req.params.postID});
        console.log("started deleting")
        if (!post.authorID.equals(res.locals.currentUser._id)) {
           res.redirect(`/posts/view-post/${req.params.postID}`)
           return;
        } 
        
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {posts: req.params.postID}})
        if (post.community) {
            await Community.updateOne({_id: post.community}, {$pull: {posts: req.params.postID}})
        }
        await Post.deleteOne({_id: req.params.postID})
        res.redirect(`/`)
    
        
    } catch (err){
        console.log("there was an error", err)
    
        res.redirect(`/`)
    }
})

module.exports = router; 