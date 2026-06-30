const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("CONNECTED TO MongoDB server");
});

db.on('error', (err) => {
    console.log("ERROR in connection to MongoDB server");
    console.log(err);
});

db.on('disconnected', () => {
    console.log("DISCONNECTED FROM MongoDB server");
});

module.exports = db;