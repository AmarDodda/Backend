// models/Consumer.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const consumerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'consumer' // Default role for consumers
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

consumerSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

const Consumer = mongoose.model('Consumer', consumerSchema,'consumer');

module.exports = Consumer;
