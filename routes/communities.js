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
    if (!res.locals.currentUser) {
        res.redirect('/users/sign-up')
        return;
    }
    res.render('../views/communities/new-community')
})

router.post('/new-community', (req, res) => {
    let details = req.body;
    details.topics = details.topics.split(',').map(topic => topic.trim())
    details.tags = details.tags.split(',').map(tag => tag.trim())
    const newCommunity = new Community({
        name: details.name,
        creator: res.locals.currentUser._id,
        description: details.description,
        tags: details.tags,
        topics: details.topics
    });


    newCommunity.save()
        .then(community => {
            User.updateOne({_id: res.locals.currentUser._id}, {$push: {createdCommunities: community._id, communities: community._id}})
                .then(res.redirect(`/communities/${community.name}`))
        })
})

router.get('/:communtiy_name', (req, res) => {
    Community.findOne({name: req.params.communtiy_name})
    .populate('posts')
    .populate('creator')
    .populate('admins')
    .exec(community => {
        res.render(
            '../views/communities/view-community',
            {
                community: community
            }
        );
    })
})


module.exports = router;