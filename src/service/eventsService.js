'use strict'

const {
    getAllEventsDB,
    getEventDB,
    createEventDB,
    bulkCreateEventDB,
    updateEventDB,
    deleteEventDB,
    bulkDeleteEventDB
} = require('../repository/eventsRepository')

// TODO better handle object properties to do not list internal implementation
const getAllEvents = async () => {
    return await getAllEventsDB()
}

const getEvent = async (title) => {
    const query = {
        'title': {
            '$regex': title
        }
    }

    console.log('quering mongodb with: ', query)
    return await getEventDB(query)

}

const createEvent = async (event) => {
    return await createEventDB(event)
}

const bulkCreateEvent = async (events) => {
    return await bulkCreateEventDB(events)
}

const updateEvent = async (title, event) => {
    const query = {
        title: title
    }

    return await updateEventDB(query, event)
}

const deleteEvent = async (title) => {
    const query = {
        title: title
    }

    const options = {

    }

    return await deleteEventDB(query, options)
}

const bulkDeleteEvent = async (title) => {
    const query = {
        title: title
    }

    const options = {

    }

    return await bulkDeleteEventDB(query, options)
}

module.exports = {
    getAllEvents,
    getEvent,
    createEvent,
    bulkCreateEvent,
    updateEvent,
    deleteEvent,
    bulkDeleteEvent
}
