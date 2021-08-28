const proxyquire = require('proxyquire').noCallThru()
const should = require('should')

const getModule = ({
    getAllEventsDB = async () => null,
    getEventDB = async () => null,
    createEventDB = async () => null,
    bulkCreateEventDB = async () => null,
    updateEventDB = async () => null,
    deleteEventDB = async () => null,
    bulkDeleteEventDB = async () => null
}) => {
    return {
        myModule: proxyquire('../eventsService', {
            '../repository/eventsRepository': {
                getAllEventsDB,
                getEventDB,
                createEventDB,
                bulkCreateEventDB,
                updateEventDB,
                deleteEventDB,
                bulkDeleteEventDB
            }
        })
    }
}

describe('eventsService', () => {
    describe('#getAllEvents', () => {
        it('Should return successfully all events in DB', async () => {
            const mockedEvents = [
                {
                    _id: "612a46db5aab6a2faf81d88b",
                    title: "Event Title",
                    location: "Location",
                    maximumCapacity: 123,
                    startDate: "2021-08-28T11:30:53Z",
                    endDate: "2021-08-28T18:30:53Z",
                    description: "Simple event description"
                },
                {
                    _id: "612a5b301dae13d7357d101c",
                    title: "Event Title 2",
                    location: "Location 2",
                    maximumCapacity: 1232,
                    startDate: "2021-08-29T11:30:53Z",
                    endDate: "2021-08-29T18:30:53Z",
                    description: "Simple event description 2"
                }
            ]

            const { myModule } = getModule({
                getAllEventsDB: () => {
                    return Promise.resolve(mockedEvents)
                }
            })

            const results = await myModule.getAllEvents()
            should(results.length).be.equals(mockedEvents.length)
            should(results[0]).be.deepEqual(mockedEvents[0])
            should(results[1]).be.deepEqual(mockedEvents[1])

        })
        it('Should return an empty array due no events in DB', async () => {
            const mockedEvents = []

            const { myModule } = getModule({
                getAllEventsDB: () => {
                    return Promise.resolve(mockedEvents)
                }
            })

            const results = await myModule.getAllEvents()
            should(results.length).be.equals(mockedEvents.length)
        })
        it('Should fail to return events from DB', async () => {
            const { myModule } = getModule({
                getAllEventsDB: () => {
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.getAllEvents()
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
    describe('#getEvent', () => {
        it('Should return successfully query result all events in DB. The query should contain eventTitle and eventLocation', async () => {
            const EVENT_TITLE = 'eventTitle'
            const EVENT_LOCATION = 'eventLocation'

            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const expectedQuery = {
                title: {
                    '$regex': EVENT_TITLE
                }, 
                location: {
                    '$regex': EVENT_LOCATION
                }
            }

            const { myModule } = getModule({
                getEventDB: (query) => {
                    should(query).be.deepEqual(expectedQuery)
                    return Promise.resolve(mockedEvents)
                }
            })

            const result = await myModule.getEvent({
                eventTitle: EVENT_TITLE,
                eventLocation: EVENT_LOCATION
            })
            should(result).be.deepEqual(mockedEvents)
            
        })
        it('Should return successfully query result all events in DB. The query should contain eventTitle', async () => {
            const EVENT_TITLE = 'eventTitle'

            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const expectedQuery = {
                title: {
                    '$regex': EVENT_TITLE
                }
            }

            const { myModule } = getModule({
                getEventDB: (query) => {
                    should(query).be.deepEqual(expectedQuery)
                    return Promise.resolve(mockedEvents)
                }
            })

            const result = await myModule.getEvent({
                eventTitle: EVENT_TITLE
            })
            should(result).be.deepEqual(mockedEvents)
        })
        it('Should return successfully query result all events in DB. The query should contain eventLocation', async () => {
            const EVENT_LOCATION = 'eventLocation'

            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const expectedQuery = {
                location: {
                    '$regex': EVENT_LOCATION
                }
            }

            const { myModule } = getModule({
                getEventDB: (query) => {
                    should(query).be.deepEqual(expectedQuery)
                    return Promise.resolve(mockedEvents)
                }
            })

            const result = await myModule.getEvent({
                eventLocation: EVENT_LOCATION
            })
            should(result).be.deepEqual(mockedEvents)
        })
        it('Should return successfully query result all events in DB. The query should be an empty object', async () => {
            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const expectedQuery = { }

            const { myModule } = getModule({
                getEventDB: (query) => {
                    should(query).be.deepEqual(expectedQuery)
                    return Promise.resolve(mockedEvents)
                }
            })

            const result = await myModule.getEvent({ })
            should(result).be.deepEqual(mockedEvents)
        })
        it('Should return an empty object due not found event in DB', async () => {
            const EVENT_TITLE = 'eventTitle'
            const EVENT_LOCATION = 'eventLocation'

            const mockedEvents = {}

            const expectedQuery = {
                title: {
                    '$regex': EVENT_TITLE
                }, 
                location: {
                    '$regex': EVENT_LOCATION
                }
            }

            const { myModule } = getModule({
                getEventDB: (query) => {
                    should(query).be.deepEqual(expectedQuery)
                    return Promise.resolve(mockedEvents)
                }
            })

            const result = await myModule.getEvent({
                eventTitle: EVENT_TITLE,
                eventLocation: EVENT_LOCATION
            })
            should(result).be.deepEqual(result)
        })
        it('Should fail to query events in DB', async () => {
            const EVENT_LOCATION = 'eventLocation'

            const expectedQuery = {
                location: {
                    '$regex': EVENT_LOCATION
                }
            }

            const { myModule } = getModule({
                getEventDB: (query) => {
                    should(query).be.deepEqual(expectedQuery)
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.getEvent({
                    eventLocation: EVENT_LOCATION
                })
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
    describe('#createEvent', () => {
        it('Should create successfully event in DB', async () => {
            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const { myModule } = getModule({
                createEventDB: (event) => {
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.resolve(event)
                }
            })

            const result = await myModule.createEvent(mockedEvents)
            should(result).be.deepEqual(mockedEvents)
        })
        it('Should fail to create event in DB', async () => {
            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const { myModule } = getModule({
                createEventDB: (event) => {
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.createEvent(mockedEvents)
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
    describe('#bulkCreateEvent', () => {
        it('Should create successfully all events in DB', async () => {
            const mockedEvents = [
                {
                    _id: "612a46db5aab6a2faf81d88b",
                    title: "Event Title",
                    location: "Location",
                    maximumCapacity: 123,
                    startDate: "2021-08-28T11:30:53Z",
                    endDate: "2021-08-28T18:30:53Z",
                    description: "Simple event description"
                },
                {
                    _id: "612a5b301dae13d7357d101c",
                    title: "Event Title 2",
                    location: "Location 2",
                    maximumCapacity: 1232,
                    startDate: "2021-08-29T11:30:53Z",
                    endDate: "2021-08-29T18:30:53Z",
                    description: "Simple event description 2"
                }
            ]

            const { myModule } = getModule({
                bulkCreateEventDB: (event) => {
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.resolve(event)
                }
            })

            const result = await myModule.bulkCreateEvent(mockedEvents)
            should(result).be.deepEqual(mockedEvents)
        })
        it('Should fail to create events in DB', async () => {
            const mockedEvents = [
                {
                    _id: "612a46db5aab6a2faf81d88b",
                    title: "Event Title",
                    location: "Location",
                    maximumCapacity: 123,
                    startDate: "2021-08-28T11:30:53Z",
                    endDate: "2021-08-28T18:30:53Z",
                    description: "Simple event description"
                },
                {
                    _id: "612a5b301dae13d7357d101c",
                    title: "Event Title 2",
                    location: "Location 2",
                    maximumCapacity: 1232,
                    startDate: "2021-08-29T11:30:53Z",
                    endDate: "2021-08-29T18:30:53Z",
                    description: "Simple event description 2"
                }
            ]

            const { myModule } = getModule({
                bulkCreateEventDB: (event) => {
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.bulkCreateEvent(mockedEvents)
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
    describe('#updateEvent', () => {
        it('Should update successfully the event in DB', async () => {
            const EVENT_TITLE = 'eventTitle'
            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }

            const { myModule } = getModule({
                updateEventDB: (query, event) => {
                    should(query).be.deepEqual(EXPECTED_QUERY)
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.resolve(event)
                }
            })

            const result = await myModule.updateEvent(EVENT_TITLE, mockedEvents)
            should(result).be.deepEqual(mockedEvents)
        })
        it('Should return an empty object due no event to be updated', async () => {
            const EVENT_TITLE = 'eventTitle'
            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }

            const { myModule } = getModule({
                updateEventDB: (query, event) => {
                    should(query).be.deepEqual(EXPECTED_QUERY)
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.resolve({})
                }
            })

            const result = await myModule.updateEvent(EVENT_TITLE, mockedEvents)
            should(result).be.deepEqual({})
        })
        it('Should fail to update events in DB', async () => {
            const EVENT_TITLE = 'eventTitle'
            const mockedEvents = {
                _id: "612a46db5aab6a2faf81d88b",
                title: "Event Title",
                location: "Location",
                maximumCapacity: 123,
                startDate: "2021-08-28T11:30:53Z",
                endDate: "2021-08-28T18:30:53Z",
                description: "Simple event description"
            }

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }

            const { myModule } = getModule({
                updateEventDB: (query, event) => {
                    should(query).be.deepEqual(EXPECTED_QUERY)
                    should(event).be.deepEqual(mockedEvents)
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.updateEvent(EVENT_TITLE, mockedEvents)
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
    describe('#deleteEvent', () => {
        it('Should delete successfully event in DB', async () => {
            const EVENT_TITLE = 'eventTitle'

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }
            const EXPECTED_RESPONSE = {
                result: 1
            }

            const { myModule } = getModule({
                deleteEventDB: (title) => {
                    should(title).be.deepEqual(EXPECTED_QUERY)
                    return Promise.resolve(EXPECTED_RESPONSE)
                }
            })

            const result = await myModule.deleteEvent(EVENT_TITLE)
            should(result).be.deepEqual(EXPECTED_RESPONSE)
        })
        it('Should return result equals to 0 in object due no event in DB to be deleted', async () => {
            const EVENT_TITLE = 'eventTitle'

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }
            const EXPECTED_RESPONSE = {
                result: 0
            }

            const { myModule } = getModule({
                deleteEventDB: (title) => {
                    should(title).be.deepEqual(EXPECTED_QUERY)
                    return Promise.resolve(EXPECTED_RESPONSE)
                }
            })

            const result = await myModule.deleteEvent(EVENT_TITLE)
            should(result).be.deepEqual(EXPECTED_RESPONSE)
        })
        it('Should fail to delete event from DB', async () => {
            const EVENT_TITLE = 'eventTitle'

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }

            const { myModule } = getModule({
                deleteEventDB: (title) => {
                    should(title).be.deepEqual(EXPECTED_QUERY)
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.deleteEvent(EVENT_TITLE)
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
    describe('#bulkDeleteEvent', () => {
        it('Should delete successfully selected events in DB', async () => {
            const EVENT_TITLE = 'eventTitle'

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }
            const EXPECTED_RESPONSE = {
                result: 1
            }

            const { myModule } = getModule({
                bulkDeleteEventDB: (title) => {
                    should(title).be.deepEqual(EXPECTED_QUERY)
                    return Promise.resolve(EXPECTED_RESPONSE)
                }
            })

            const result = await myModule.bulkDeleteEvent(EVENT_TITLE)
            should(result).be.deepEqual(EXPECTED_RESPONSE)
        })
        it('Should delete an empty array due no events in DB', async () => {
            const EVENT_TITLE = 'eventTitle'

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }
            const EXPECTED_RESPONSE = {
                result: 0
            }

            const { myModule } = getModule({
                bulkDeleteEventDB: (title) => {
                    should(title).be.deepEqual(EXPECTED_QUERY)
                    return Promise.resolve(EXPECTED_RESPONSE)
                }
            })

            const result = await myModule.bulkDeleteEvent(EVENT_TITLE)
            should(result).be.deepEqual(EXPECTED_RESPONSE)
        })
        it('Should fail to delete events from DB', async () => {
            const EVENT_TITLE = 'eventTitle'

            const EXPECTED_QUERY = {
                title: EVENT_TITLE
            }

            const { myModule } = getModule({
                bulkDeleteEventDB: (title) => {
                    should(title).be.deepEqual(EXPECTED_QUERY)
                    return Promise.reject(new Error('ERROR'))
                }
            })

            try {
                await myModule.bulkDeleteEvent(EVENT_TITLE)
            } catch (error) {
                should(error).be.deepEqual(new Error('ERROR'))
            }
        })
    })
})
