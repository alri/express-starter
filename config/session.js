const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const FileStore = require('session-file-store')(session);

const server = process.env.DB_HOST + ":" + process.env.DB_HOST || '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = process.env.DB_NAME || 'expressdb'; // REPLACE WITH YOUR DB NAME
const dbHost = `mongodb://${server}/${database}`;

const mongoSession = new MongoStore({
        url:dbHost,
        collection: 'sessions',
        ttl: 7* 24 * 60 * 60 , // = 7 days. Default
    });

const fileSession = new FileStore({
        ttl: 7* 24 * 60 * 60 , // = 7 days. Default
        path:'./storage/sessions',
    });

module.exports={
    mongo:mongoSession,
    file:fileSession
}