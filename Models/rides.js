const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  means: { type: String, enum: ['Boda','car', 'bus', 'taxi'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', rideSchema);