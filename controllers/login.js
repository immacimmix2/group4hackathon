// controllers/auth.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/users");    // passengers
const Rider = require("../Models/riders");  // drivers

const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // email or phone

  try {
    // Check if user is passenger
    let user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }]
    });
    let role = "passenger";

    // If not found, check if user is driver
    if (!user) {
      user = await Rider.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }]
      });
      role = "driver";
    }

    // If still not found
    if (!user) return res.status(400).json({ message: "User not found" });

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginUser };
