const express = require('express')
const router = express.Router()

router.get('/tasks', function(req, res, next){
    res.send('Task API')
})

module.exports = router;