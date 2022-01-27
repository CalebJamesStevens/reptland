const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb');
const { redirect } = require("express/lib/response");
const Community = require("../models/Community");

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
            console.log(post)
            res.json(
                post.comments
                .filter(comment => comment.parentComment == null)
                .map(comment => {return comment._id})
            )
        })
})

router.post('/new-post', upload.array('images', 2), async (req, res) => {
    const details = req.body;
    details.tags = details.tags.split(',').map(tag => tag.trim()) 
    let key = [];
    console.log(req.files)
    if (req.files) {
        key = await Promise.all(req.files.map(async file => {
            console.log('getting file')
            const result = await awsUploadFile(file)
            await unlinkFile(file.path)
            console.log('hey', result)
            return result.key 

        }))
        
    }
    


    const newPost = new Post({
        title: details.title,
        authorID: res.locals.currentUser._id,
        ...(key && {images: key})
    });
    
    console.log(details)



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
                        .then(res.redirect(`/posts/view-post/${post.id}`))
                    
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
    console.log(req.params.postID)
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
        console.log("Enriched")
    }

    res.json({message: 'Success'})
    
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



router.get(`/popular-posts`, async (req, res) => {
    await Post.find(
        {community: {$exists: true}}
    )
    .then (posts => {
        res.json(posts)
    })

})


router.delete('/:postID', async (req, res) => {
    console.log("GOT THIS FAR")
    try {
        console.log("Starting post deletion")
        await Post.findById({_id: req.params.postID}, (err, post) => {
            console.log("Starting post deletion")
            try {
                if (!post.authorID._id.equals(res.locals.currentUser._id)) {
                    res.redirect(`/posts/view-post/${req.params.postID}`)
                    return;
                } 
            } catch {
                res.redirect(`/posts//view-post/${req.params.postID}`)
                return;
            }
        }).clone()
        console.log("Post deleted")
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {posts: req.params.postID}})
        await Post.deleteOne({_id: req.params.postID})
        .then(post => {
            if (post.community) {
                Community.updateOne({_id: post.community}, {$pull: {posts: req.params.postID}})

                }
            })
            .then(res.redirect(`/`))
        
        
    } catch (err){
        console.log(err)
    
        res.redirect(`/`)
    }
})

module.exports = router; 