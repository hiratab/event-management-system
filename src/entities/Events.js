'use strict'

const { EVENTS_COLLECTION: collection } = process.env

class Events {
    constructor(title, location, maximumCapacity, startDate, endDate, description) {
        this.title = title
        this.location = location
        this.maximumCapacity = maximumCapacity
        this.startDate = startDate
        this.endDate = endDate
        this.description = description
    }

    getCollection() {
        return collection
    }
}

module.exports = Events
