'use strict'

const { Router } = require('express')
const router = Router({ mergeParams: true })

router.get('/alive', (req, res, next) => {
    console.log('Responding that I am alive')
    res.json({
        status: 200,
        message: 'I am alive',
        date: new Date()
    })
})

module.exports = router
