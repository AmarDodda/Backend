const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  consumerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  name:{
    type:String,
    required:true
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Query = mongoose.model('Query', querySchema,'queries');

module.exports = Query;
