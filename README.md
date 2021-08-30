# event-management-system

Use this in .env
```
PORT=3001
MONGO_DB_USER=mongoDBUser
MONGO_DB_PASSWORD=
MONGO_DB_DBNAME=event-management-system
MONGO_DB_CONNECTION_STRING='mongodb+srv://{username}:{password}@cluster0.trm95.mongodb.net/{dbName}?retryWrites=true&w=majority'
EVENTS_COLLECTION=events
```

Run back-end server with:
```
npm start
```

Run front-end with:
```
(cd front_end/my-app ; npm start)
```

Find work to be done in : [
Project](https://github.com/hiratab/event-management-system/projects/1)


### Request examples:
#### List events
GET localhost:3001/events/
```
curl --location --request GET 'localhost:3001/events/'
```

#### Serch events
GET localhost:3001/events/eventTitle/eventLocation
```
curl --location --request GET 'localhost:3001/events/eventTitle/eventLocation'
```

#### Create event
PUT localhost:3000/events 
Body:
{
    "title": "Event Title 4",
    "location": "Location",
    "maximumCapacity": 1234,
    "startDate": "2021-09-01T11:30:53Z",
    "endDate": "2021-09-01T18:30:53Z",
    "description": "Simple event description 4"
}
```
curl --location --request PUT 'localhost:3000/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Event Title 4",
    "location": "Location",
    "maximumCapacity": 1234,
    "startDate": "2021-09-01T11:30:53Z",
    "endDate": "2021-09-01T18:30:53Z",
    "description": "Simple event description 4"
}'
```

#### Update event
This will update the event that the title matchs the one sent in the body
POST localhost:3000/events
Body:
{
    "title": "Event Title 2",
    "location": "Location 2",
    "maximumCapacity": 1232,
    "startDate": "2021-08-29T11:30:53Z",
    "endDate": "2021-08-29T18:30:53Z",
    "description": "Simple event description 2"
}
```curl --location --request POST 'localhost:3000/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Event Title 2",
    "location": "Location 2",
    "maximumCapacity": 1232,
    "startDate": "2021-08-29T11:30:53Z",
    "endDate": "2021-08-29T18:30:53Z",
    "description": "Simple event description 2"
}'
```

#### Delete event
This will delete one events that the title matchs with the one sent in body
DELETE localhost:3000/events
Body:
{
    "title": "Event Title 4",
}
```
curl --location --request DELETE 'localhost:3000/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Event Title 4",
}'
```

#### Buck delete event
This will delete all events that the title matchs with the one sent in body
DELETE localhost:3000/events/bulk
Body:
{
    "title": "Event Title 4",
}
```
curl --location --request DELETE 'localhost:3000/events' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Event Title 4",
}'
```

