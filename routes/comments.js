const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb');
const { redirect } = require("express/lib/response");



router.post('/new', async (req, res) => {
    const details = req.body;
    if (!res.locals.currentUser) {
        res.redirect('/users/sign-in');
        return;
    }

    const newComment = new Comment({
        body: details.body,
        author: res.locals.currentUser._id,
        post: details.postID,
        parentComment: details.parentComment
    })


    try {
        await newComment.save()
        .then(comment => {
            Post.updateOne({_id: details.postID}, {$push: {comments: newComment._id}})
            .then(c => {
                console.log(c)
            })       
            if(details.parentComment != null) {
                console.log('saving reply to comment ', details.parentComment)
                Comment.findOneAndUpdate({_id: details.parentComment}, {$push: {replies: newComment._id}})
                .then(c => {
                    console.log(c)
                })       
            }
        })
        .then(
            res.redirect(`/posts/view-post/${details.postID}`)
        )
    }
    catch (err){
        console.log(err)
    }
})

router.get('/get/:commentID', async (req, res) => {
    await Comment.findById(req.params.commentID)
        .then(comment => {
            res.json(comment)
        })
})

router.get('/get/:commentID/replies', async (req, res) => {
    await Comment.findById(req.params.commentID)
        .then(comment => {
            res.json(comment.replies)
        })
})

router.delete('/:id', async (req, res) => {
    console.log('deleting comment')
    await Post.findByIdAndUpdate({_id: req.body.postID}, {$pull: {comments: req.params.id}})
    await Comment.findByIdAndDelete(req.params.id)
        .then(comment => {

            res.redirect(`/posts/view-post/${req.body.postID}`)
        })
})



module.exports = router;