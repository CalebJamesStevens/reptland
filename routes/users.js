const express = require("express")
const router = express.Router();
const User = require("../models/User");

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
        res.send('pass')
    }

});
module.exports = router;