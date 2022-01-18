const express = require("express")
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { redirect } = require("express/lib/response");
const { query } = require("express");
const url = require('url')

router.get('/currentUser', async (req, res) => {
    if (!res.locals.currentUser) {
        res.json(null);
        return;
    }
    await User.findById(res.locals.currentUser._id)
        .then(cU => {
            res.json(cU)
        })
})

router.get('/:userID/user-posts', async (req, res) => {
    await User.findById(req.params.userID)
        .then(user => {
            res.json(user.posts)
        })
})

router.get(`/:username/profile`, async (req, res) => {
    console.log('REQUEST')
    await User.findOne({username: req.params.username})
        .then(user => {
            res.json(user)
        })
    console.log('went')
})

router.post(`/:username/request-friend`, async (req, res) => {
    console.log('REQUEST')
    if (!res.locals.currentUser) {
        res.redirect(`/users/sign-in`)
        return;
    }
    const details = req.body;

    switch(details.request) {
        case 'add':
            await User.updateOne({_id: res.locals.currentUser._id}, {$push: {sentFriendRequests: details.userID}})
            await User.findOneAndUpdate({_id: details.userID}, {$push: {friendRequests: res.locals.currentUser._id}})
                .then(user => {
                    res.redirect(`/users/${user.username}/profile`)
                })
            break;
        case 'remove':
            await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {friends: details.userID}})
            await User.findOneAndUpdate({_id: details.userID}, {$pull: {friends: res.locals.currentUser._id}})
                .then(user => {
                    res.redirect(`/users/${user.username}/profile`)
                })
            break;
        case 'cancel':
            await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {sentFriendRequests: details.userID}})
            await User.findOneAndUpdate({_id: details.userID}, {$pull: {friendRequests: res.locals.currentUser._id}})
                .then(user => {
                    res.redirect(`/users/${user.username}/profile`)
                })
            break;
        default:
            res.redirect(`/users/${user.username}/profile`)
            res.send({message: 'invalid request'})

    }

})

router.post(`/:username/accept-friend-request`, async (req, res) => {
    console.log('REQUEST')
    const details = req.body;
    console.log(details.accepted == 'true')
    console.log(details.accepted)
    if (details.accepted == 'true') {
        await User.updateOne({_id: details.userID}, {$pull: {sentFriendRequests: res.locals.currentUser._id}, $push: {friends: res.locals.currentUser._id}})
        await User.findOneAndUpdate({_id: res.locals.currentUser._id}, {$pull: {friendRequests: details.userID}, $push: {friends: details.userID}})
            .then(user => {
                res.redirect(`/users/${res.locals.currentUser.username}/friends`)
            })
    } else {
        await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {friendRequests: details.userID}})
        await User.findOneAndUpdate({_id: details.userID}, {$pull: {sentFriendRequests: res.locals.currentUser._id}})
            .then(user => {
                res.redirect(`/users/${res.locals.currentUser.username}/friends`)
            })
    }
})

router.get(`/getEnrichedPosts`, async (req, res) => {
    if (!res.locals.currentUser) return;
    await User.findById(res.locals.currentUser._id)
    .then(user => {
        console.log('ENRICHED POSTS', user.enrichedPosts)
        res.json(user.enrichedPosts)
    })
})

router.post(`/:username/follow-user`, async (req, res) => {
    console.log('REQUEST')
    const details = req.body;
    await User.updateOne({_id: res.locals.currentUser._id}, {$push: {followedUsers: details.userID}})
    await User.findOneAndUpdate({_id: details.userID}, {$push: {followers: res.locals.currentUser._id}})
        .then(user => {
            res.redirect(`/users/${user.username}/profile`)
        })
})

router.post(`/:username/unfollow-user`, async (req, res) => {
    console.log('REQUEST')
    const details = req.body;
    await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {followedUsers: details.userID}})
    await User.findOneAndUpdate({_id: details.userID}, {$pull: {followers: res.locals.currentUser._id}})
        .then(user => {
            res.redirect(`/users/${user.username}/profile`)
        })
})

router.get('/sign-up', (req, res) => res.render('users/signUp'))

router.post('/sign-up', (req, res) => {
    const {username, email, password, confirm_password} = req.body;
    let errors = [];

    if (!username || !email || !password || !confirm_password) {
        errors.push({msg: "Please fill in all fields"});
    }

    if (password !== confirm_password) {
        errors.push({msg: "Passwords do not match"});

    }

    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0) {
        res.render('users/signUp', {
            errors,
            username,
            email,
            password,
            confirm_password
        });
    } else {
        User.findOne({email: email})
            .then(user => {
                
                if (user) {
                    errors.push({msg:'Email already registered'})
                    res.render('users/signUp', {
                        errors,
                        username,
                        email,
                        password,
                        confirm_password
                    });
                } else {
                    User.findOne({username: username})
                        .then(user_ => {
                            if (user_) {
                                errors.push({msg:'Username already in use'})
                                res.render('users/signUp', {
                                    errors,
                                    username,
                                    email,
                                    password,
                                    confirm_password
                                });
                            } else {
                                const newUser = new User( {
                                    username,
                                    email,
                                    password
                                });
                                
                                //Hash Password
                                bcrypt.genSalt(10, (err, salt) =>
                                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                                        if (err) throw err;
                                        //set password to hashed
                                        newUser.password = hash;
                                        //save user
                                        newUser.save()
                                            .then(user => {
                                                res.redirect('/users/sign-in')
                                            })
                                            .catch(err => console.log(err))
                                }))
                            }
                        })
                }
            })
    }

});

router.get('/sign-in', (req, res) => {console.log('sign in page')})

router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })(req, res, next)
});

router.get('/logout', async (req, res, next) => {
    console.log('logging out')
    req.logout()
    res.json({message: 'Succesfully logged out'})
})

router.get('/getrandom', async (req, res) => {
    await User.aggregate(
        [{$sample: {size: 1}}]
    )
    .then (user => {
        const data = {
            username: user[0].username,
            id: user[0]._id
        }
        res.json(user)
    })
})

// Getting user info

router.get('/:id/info', async (req, res) => {
    const q = await req.query;
    let u = {}
    await User.findOne({_id: req.params.id})
        .populate('friends')
        .populate('friendRequests')
        .exec((err, user) => {
            u = {
                ...(q.id && {_id: user._id}),
                ...(q.username && {username: user.username}),
                ...(q.friends && {friends: user.friends.map(e => {return {_id: e._id, username: e.username}})}),
                ...(q.friendRequests && {friendRequests: user.friendRequests.map(e => {return {_id: e._id, username: e.username}})}),
            }
            res.json(u)
        })
})

module.exports = router;