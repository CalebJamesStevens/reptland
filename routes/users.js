const express = require("express")
const router = express.Router();
const User = require("../models/User");

router.get('/sign-in', (req, res) => res.render("users/signIn"))

router.get('/sign-up', (req, res) => res.render('users/signUp'))

router.post('/sign-up', (req, res) => {
    
});
module.exports = router;