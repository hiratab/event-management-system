'use strict'

const EventsService = require('../service/eventsService')

// TODO implement filters and order by
const getAllEvents = async (req, res, next) => {
    const events = await EventsService.getAllEvents()
    res.json(events)
}

const getEvent = async (req, res, next) => {
    const { eventTitle, eventLocation } = req.params

    if ( !eventTitle && !eventLocation) {
        throw new Error('BAD_REQUEST')
    }

    const event = await EventsService.getEvent({ eventTitle, eventLocation })
    res.json(event)
}

const createEvent = async (req, res, next) => {
    const {
        title,
        location,
        maximumCapacity,
        startDate,
        endDate,
        description
    } = req.body

    if (!title || !location || !maximumCapacity || !startDate || !endDate || !description) {
        throw new Error('BAD_REQUEST')
    }

    const { insertedId } = await EventsService.createEvent({
        title,
        location,
        maximumCapacity,
        startDate,
        endDate,
        description
    })

    res.send(insertedId)
}

const updateEvent = async (req, res, next) => {
    const {
        title,
        location,
        maximumCapacity,
        startDate,
        endDate,
        description
    } = req.body

    if (!title || !location || !maximumCapacity || !startDate || !endDate || !description) {
        throw new Error('BAD_REQUEST')
    }

    const { value } = await EventsService.updateEvent(title, {
        title,
        location,
        maximumCapacity,
        startDate,
        endDate,
        description
    })

    res.send(value) 
}

const deleteEvent = async (req, res, next) => {
    const { title } = req.body

    if (!title) {
        throw new Error('BAD_REQUEST')
    }

    const result = await EventsService.deleteEvent(title)

    res.send({ result: result })
}

const bulkDeleteEvent = async (req, res, next) => {
    const { title } = req.body

    if (!title) {
        throw new Error('BAD_REQUEST')
    }

    const result = await EventsService.bulkDeleteEvent(title)

    res.send({ result: result })
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    bulkDeleteEvent
}
