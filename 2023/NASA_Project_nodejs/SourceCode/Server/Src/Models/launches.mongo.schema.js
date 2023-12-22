const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 100,
    // max: 999
  },
  launchDate: { type: Date, required: true },
  rocket: { type: String, required: true },
  //   target: { type: mongoose.ObjectId, ref: 'Planet' } // these makes it difficult becuase we have to write our own join function
  target: { type: String },
  mission: { type: String, required: true },
  customer: { type: [String], required: true },
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true, default: true },
});

// Connect's launchesSchema with the "launches" collection
module.exports = mongoose.model( 'Launch', launchSchema )