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
        commentBody: details.commentBody,
        commentAuthor: res.locals.currentUser._id,
        post: details.postID
    })

    await newComment.save()
        .then(comment => {
            Post.updateOne({_id: details.postID}, {$push: {comments: newComment._id}})
                .then(
                    res.redirect(`/posts/${details.postID}`)
                )
        })
})

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndUpdate({_id: req.body.postID}, {$pull: {comments: req.params.id}})
    await Comment.findByIdAndDelete(req.params.id)
        .then(comment => {

            res.redirect(`/posts/${req.body.postID}`)
        })
})



module.exports = router;