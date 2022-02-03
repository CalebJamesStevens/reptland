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

router.post('/new-community', async (req, res) => {
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

    await Community.findOne({name: details.name})
    .then(c => {
        if (c) {
            res.redirect('/communities/new-community')
            return;
        } else {
            newCommunity.save()
                .then(community => {
                    User.updateOne({_id: res.locals.currentUser._id}, {$push: {createdCommunities: community._id, communities: community._id}})
                        .then(res.redirect(`/communities/view/${community.name}`))
                })
        }
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

router.post('/:community/join-community', async (req, res) => {
    await Community.updateOne({name: req.params.community}, {$push: {followers: res.locals.currentUser._id}})
    await User.updateOne({_id: res.locals.currentUser._id}, {$push: {communities: req.body.communityID}})
    .then(user => {
        res.redirect(`/communities/view/${req.params.community}`)
    })
})

router.post('/:community_name/leave-community', async (req, res) => {
    await Community.updateOne({name: req.params.community_name}, {$pull: {followers: res.locals.currentUser._id}})
    await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {communities: req.body.communityID}})
    .then(user => {
        res.redirect(`/communities/view/${req.params.community_name}`)
    })
})

router.get('/view/:community', async (req, res) => {
    
    let community = req.params.community.toLowerCase();
    
    

    //try to find by name
    try {

        
        await Community.findOne({name: community})
            .then(c => {
                
                if (c) {
                    res.json(c);
                    return;
                }
            })
    } catch {
        
    }

    // Try to find by id
    try {
        
        await Community.findOne({_id: community})
            .then(c => {
                
                if (c) {
                    res.json(c);
                }
            })
    } catch {

    }
    
})


router.get('/:community/:topic/posts', async (req, res) => {
    await Community.findOne({name: req.params.community})
        .populate('posts')
        .then(c => {
            res.json(
                c.posts
                .filter(post => post.communityTopic == req.params.topic)
                .map(post => {return post._id})
            )
        })
})

router.get('/getrandom', async (req, res) => {
    await Community.aggregate(
        [{$sample: {size: 1}}]
    )
    .then (community => {
        res.json(community)
    })
})


module.exports = router;