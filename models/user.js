const mongoose = require('mongoose');


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

module.exports = mongoose.model('User', userSchema, 'admin');