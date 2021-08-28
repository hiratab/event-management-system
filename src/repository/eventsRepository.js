'use strict'

const MongoClient = require('../config/Mongo')

const Event = require('../entities/Events')
const EventCollection = Event.prototype.getCollection()

const getAllEventsDB = async (query = {}, options = {}) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    const resultsCursor =  await collection.find(query, options)
    return resultsCursor.toArray()
}

const getEventDB = async (query = {}, options = {}) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    return await collection.findOne(query, options)
}

const createEventDB = async (event) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    return collection.insertOne(event)
}

const bulkCreateEventDB = async (events) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    return collection.insertMany(events)
}

const updateEventDB = async (query, event) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    return await collection.findOneAndReplace(query, event)
}

const deleteEventDB = async (query = {}, options = {}) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    const result = await collection.deleteOne(query, options)

    return result.deletedCount
}

const bulkDeleteEventDB = async (query = {}, options = {}) => {
    const collection = await MongoClient.getMongoClient(EventCollection)
    const result = await collection.deteleMany(query, options)

    return result.deletedCount
}

module.exports = {
    getAllEventsDB,
    getEventDB,
    createEventDB,
    bulkCreateEventDB,
    updateEventDB,
    deleteEventDB,
    bulkDeleteEventDB
}
