const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = 'mongodb://localhost:27017/hotels';
//const mongoURL = "mongodb+srv://sumit:sumit2511@cluster0.itrjalf.mongodb.net/"
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