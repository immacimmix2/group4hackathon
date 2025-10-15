const Ride = require('../Models/rides');

// POST: Create a new ride
exports.createRide = async (req, res) => {
  try {
    const { pickup, dropoff, means } = req.body;

    if (!pickup || !dropoff || !means) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const ride = new Ride({ pickup, dropoff, means });
    await ride.save();

    res.status(201).json({ message: 'Ride created successfully', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET: Fetch all rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ count: rides.length, rides });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
