const { googleLogin } = require('../controller/authcontroller');

const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send('test passed');    
})

router.get('/google', googleLogin)

module.exports = router;
