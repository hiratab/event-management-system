const { MongoClient } = require('mongodb')

const {
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
    MONGO_DB_DBNAME,
    MONGO_DB_CONNECTION_STRING
} = process.env

const URI = "mongodb+srv://mongoDBUser:PN3e4QjHTfYtAFxd@cluster0.trm95.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let _MongoClient

const getMongoClient = async (dbName, collectionName) => {
    if (!_MongoClient) {
        await startMongoCliente()
    }

    return _MongoClient.db(dbName).collection(collectionName)

}

const startMongoClient = async () => {
    buildConnectionString()

    if (!_MongoClient) {
        console.log('Starting Mongo Client')
        _MongoClient = new MongoClient(URI)
        await _MongoClient.connect()
        console.log('Started Mongo Client')
    }
    console.log('Testing Mongo Client connection')
    await listDatabases(_MongoClient)
}

const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases()

    console.log("Databases:")
    databasesList.databases.forEach(database => {
        console.log(` - ${database.name}`)
    });
}

const closeMongoClient = async () => {
    console.log('Closing Mongo Client')
    if (_MongoClient) await _MongoClient.close()
    console.log('Closed Mongo Client')
}

const buildConnectionString = () => {
    console.log(process.env)
    console.log(process.env.MONGO_DB_CONNECTION_STRING)
    console.log('Parsing connection string', MONGO_DB_CONNECTION_STRING)

    let connectionString = MONGO_DB_CONNECTION_STRING
    connectionString.replace('{username}', MONGO_DB_USER)
    connectionString.replace('{password}', MONGO_DB_PASSWORD)
    connectionString.replace('{dbName}', MONGO_DB_DBNAME)

    console.log('Parsed connection string', connectionString)
}

module.exports = {
    getMongoClient,
    startMongoClient,
    closeMongoClient
}