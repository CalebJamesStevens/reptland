const express = require("express")
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs')
const passport = require('passport');


router.get('/sign-in', (req, res) => res.render("users/signIn"))

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

router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/sign-in'
    })(req, res, next)
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/sign-in')
})

module.exports = router;