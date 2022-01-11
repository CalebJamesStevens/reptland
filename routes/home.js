const express = require("express")
const router = express.Router();


router.get('/', (req, res) => {
    console.log('home')
    const test = {
        msg: 'hey'
    }
    res.json(test)
})

router.get('/followed-users', (req, res) => {
    console.log('follower')
    const test = {
        msg: 'hey'
    }
    res.json(test)
})

module.exports = router;