// const mongoose = require('mongoose');

// // Define the communication schema
// const communicationSchema = new mongoose.Schema({
//   customer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Customer',
//     required: true,
//   },
//   communicationType: {
//     type: String,
//     required: true,
//     enum: ['email', 'feedback', 'query'],
//   },
//   subject: {
//     type: String,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   communicationDate: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create the Communications model
// const Communications = mongoose.model('communications', communicationSchema, 'communications');

// module.exports = Communications;

const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  communicationType: {
    type: String,
    required: true,
    enum: ['email', 'feedback', 'query'],
  },
  subject: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  communicationDate: {
    type: Date,
    default: Date.now,
  },
  emailContent: {
    type: String,  // Store the email content sent to the customer
    required: true,
  },
});

const Communications = mongoose.model('communications', communicationSchema, 'communications');

module.exports = Communications;
