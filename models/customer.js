const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseHistory: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      product: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  preferences: {
    fabricTypes: [String],
    colors: [String],
    designs: [String],
    
  },
});

const Customer = mongoose.model('Customer', customerSchema,'customers');

module.exports = Customer;
