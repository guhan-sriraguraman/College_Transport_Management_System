const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  homeAddress: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  busNumber : {
    type : String,
    required : false
  },
  busFee: {
    type: Number,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Student', studentSchema);
