const mongoose = require('mongoose');

// create a schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// create a model and export it

module.exports = mongoose.model('User', userSchema, 'admin');