const { MongoClient } = require('mongodb')

const {
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
    MONGO_DB_DBNAME,
    MONGO_DB_CONNECTION_STRING
} = process.env

let _MongoClient

const getMongoClient = async (collectionName) => {
    if (!_MongoClient) {
        await startMongoCliente()
    }

    return _MongoClient.db(MONGO_DB_DBNAME).collection(collectionName)

}

const startMongoClient = async () => {
    if (!_MongoClient) {
        console.log('Starting Mongo Client')
        _MongoClient = new MongoClient(buildConnectionString())
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
    console.log('Parsing connection string', MONGO_DB_CONNECTION_STRING)

    let connectionString = MONGO_DB_CONNECTION_STRING
        .replace('{username}', MONGO_DB_USER)
        .replace('{password}', MONGO_DB_PASSWORD)
        .replace('{dbName}', MONGO_DB_DBNAME)
    
    console.log('Parsed connection string', connectionString)
    return connectionString
}

module.exports = {
    getMongoClient,
    startMongoClient,
    closeMongoClient
}
