let registeredPlates = ["UAA123A", "UBB456B", "UCC789C"];

// Register a new plate
exports.registerPlate = (req, res) => {
  const { plate } = req.body;

  if (!plate) {
    return res.status(400).json({ success: false, message: "Plate number is required" });
  }

  if (registeredPlates.includes(plate.toUpperCase())) {
    return res.status(400).json({ success: false, message: "Plate already registered" });
  }

  registeredPlates.push(plate.toUpperCase());
  res.json({ success: true, message: "Plate registered successfully", plates: registeredPlates });
};

// Verify plate
exports.verifyPlate = (req, res) => {
  const { plate } = req.body;

  if (!plate) {
    return res.status(400).json({ success: false, message: "Plate number is required" });
  }

  const isValid = registeredPlates.includes(plate.toUpperCase());

  if (isValid) {
    res.json({ valid: true, message: "Number plate verified. Passenger can board." });
  } else {
    res.json({ valid: false, message: "Number plate not recognized!" });
  }
};

// Optional: Get all plates
exports.getAllPlates = (req, res) => {
  res.json({ plates: registeredPlates });
};