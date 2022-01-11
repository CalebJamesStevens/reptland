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
    details.topics.unshift('General');
    details.name = details.name.toLowerCase();
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
                .then(res.redirect(`/communities/view/${community.name}`))
        })
})

router.get('/:community_name/new-community-post', (req, res) => {
    if (!res.locals.currentUser) {
        res.redirect('/users/sign-up')
        return;
    }
    Community.findOne({name: req.params.community_name})
    .exec((err, community) => {
        res.render(
            '../views/communities/new-community-post',
            {
                community: community
            }
        );
    })
})

router.post('/:community_name/join-community', async (req, res) => {
    await Community.updateOne({name: req.params.community_name}, {$push: {followers: res.locals.currentUser._id}})
    await User.updateOne({_id: res.locals.currentUser._id}, {$push: {communities: req.body.communityID}})
    .then(user => {
        res.redirect(`/communities/${req.params.community_name}`)
    })
})

router.post('/:community_name/leave-community', async (req, res) => {
    await Community.updateOne({name: req.params.community_name}, {$pull: {followers: res.locals.currentUser._id}})
    await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {communities: req.body.communityID}})
    .then(user => {
        res.redirect(`/communities/${req.params.community_name}`)
    })
})

router.get('/view/:community', async (req, res) => {
    console.log("FINDING COMMUNITY")
    let community = req.params.community.toLowerCase();
    console.log(req.params.community)
    console.log(community)

    //try to find by name
    try {

        console.log('trying name')
        await Community.findOne({name: community})
            .then(c => {
                console.log('Name' + c)
                if (c) {
                    res.json(c);
                    return;
                }
            })
    } catch {
        
    }

    // Try to find by id
    try {
        console.log('trying id')
        await Community.findOne({_id: community})
            .then(c => {
                console.log('ID' + c)
                if (c) {
                    res.json(c);
                }
            })
    } catch {

    }
    
})



module.exports = router;