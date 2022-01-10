const express = require("express")
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { redirect } = require("express/lib/response");

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

router.get(`/:username/profile`, async (req, res) => {
    console.log('REQUEST')
    await User.findOne({username: req.params.username})
        .populate('posts')
        .populate('friendRequests')
        .populate('friends')
        .populate('followers')
        .populate('followedUsers')
        .exec((err, user) => {
            res.render("users/profile", {
                user: user
            })
        })
    console.log('went')
})

router.post(`/:username/request-friend`, async (req, res) => {
    console.log('REQUEST')
    const details = req.body;
    await User.updateOne({_id: res.locals.currentUser._id}, {$push: {sentFriendRequests: details.userID}})
    await User.findOneAndUpdate({_id: details.userID}, {$push: {friendRequests: res.locals.currentUser._id}})
        .then(user => {
            res.redirect(`/users/${user.username}/profile`)
        })
})

router.post(`/:username/accept-friend-request`, async (req, res) => {
    console.log('REQUEST')
    const details = req.body;
    await User.updateOne({_id: details.friendID}, {$pull: {sentFriendRequests: res.locals.currentUser._id}, $push: {friends: res.locals.currentUser._id}})
    await User.findOneAndUpdate({_id: res.locals.currentUser._id}, {$pull: {friendRequests: details.friendID}, $push: {friends: details.friendID}})
        .then(user => {
            res.redirect(`/users/${user.username}/profile`)
        })
})

router.post(`/:username/unfriend`, async (req, res) => {
    console.log('REQUEST')
    const details = req.body;
    await User.updateOne({_id: res.locals.currentUser._id}, {$pull: {friends: details.userID}})
    await User.findOneAndUpdate({_id: details.userID}, {$pull: {friends: res.locals.currentUser._id}})
        .then(user => {
            res.redirect(`/users/${user.username}/profile`)
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

router.get('/sign-out', (req, res) => {
    req.logout();
    res.redirect('/users/sign-in')
})

module.exports = router;