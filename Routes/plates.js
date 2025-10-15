const express = require('express');
const router = express.Router();
const { registerPlate, verifyPlate, getAllPlates } = require('../controllers/plates');

router.post('/verify-plate', verifyPlate);
router.post('/register-plate', registerPlate);
router.get('/plates', getAllPlates); // Optional: Get all registered plates


module.exports = router;