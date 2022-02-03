const express = require("express")
const router = express.Router();


router.get('/', (req, res) => {
    
    const test = {
        msg: 'hey'
    }
    res.json(test)
})

router.get('/followed-users', (req, res) => {
    
    const test = {
        msg: 'hey'
    }
    res.json(test)
})

module.exports = router;