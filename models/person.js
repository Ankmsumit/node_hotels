const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'owner'],
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;