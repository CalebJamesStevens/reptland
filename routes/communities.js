const express = require("express")
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require('mongoose')
const {ObjectId} = require('mongodb');
const { redirect } = require("express/lib/response");
const Community = require("../models/Community");


router.get('/new-community', (req, res) => {
    res.render('../views/posts/new-community')
})

router.post('/new-community', (req, res) => {
    const details = req.body;
    const newCommunity = new Community({
        name: details.name,
        creator: res.locals.currentUser._id,
        description: details.description,
        tags: details.tags,
        topics: details.topics
    });


    newCommunity.save()
        .then(community => {
            User.updateOne({_id: res.locals.currentUser._id}, {$push: {createdCommunities: community._id}})
                .then(res.redirect(`/communities/${community._id}`))
            
        })
})

router.get('/:id', (req, res) => {
    Community.findById(req.params.id)
    .populate('posts')
    .populate('creator')
    .populate('admins')
    .exec(community => {
        res.render(
            '../views/posts/view-community',
            {
                community: community
            }
        );
    })
})


module.exports = router;