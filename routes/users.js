const express = require("express")
const router = express.Router();


router.get('/login', (req, res) => res.send("Login"))

router.get('/sign-up', (req, res) => res.send("Sign Up!"))

module.exports = router;