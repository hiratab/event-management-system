'use strict'

const { Router } = require('express')
const router = Router({ mergeParams: true })

const { format } = require('date-fns')

const {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    bulkDeleteEvent
} = require('./eventsRouter')

const requestWrapper = (fn) => async (req, res, next) => await fn(req, res, next).catch((error) => {
    console.log(error)
    return res.status(500).send({
        code: error.message
    })
})

const alive = async (req, res, next) => {
    console.log('Responding that I am alive')
    console.log(format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''))
    res.json({
        status: 200,
        message: 'I am alive',
        date: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    })
}

router.get('/alive', requestWrapper(alive))
router.get('/events', requestWrapper(getAllEvents))
router.get('/events/:eventName', requestWrapper(getEvent))
router.put('/events', requestWrapper(createEvent))
router.post('/events', requestWrapper(updateEvent))
router.delete('/events', requestWrapper(deleteEvent))
router.delete('/events/bulk', requestWrapper(bulkDeleteEvent))

module.exports = router
