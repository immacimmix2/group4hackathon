const express = require('express');
const router = express.Router();
const { createRide, getAllRides } = require('../controllers/rides');

// Create a new ride
router.post('/rides', createRide);

// Get all rides
router.get('/rides', getAllRides);

module.exports = router;