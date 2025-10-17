const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Rider = require("../Models/riders"); // rename import to match usage

const registerRider = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        phoneNumber,
        Gender,
        NIN,
        vehicle,
        numberPlate,
        Kinname,
        kinPhoneNumber,
        Relationship,
        password,
        confirmpassword,
        role // 👈 comes automatically from frontend
    } = req.body;

    try {
        const existingRider = await Rider.findOne({ email });
        if (existingRider)
            return res.status(400).json({ message: "User already exists" });

        if (password !== confirmpassword)
            return res.status(400).json({ message: "Password mismatch" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const fullName = `${firstname} ${lastname}`.trim();

        const result = await Rider.create({
            name: fullName,
            email,
            phoneNumber,
            Gender,
            NIN,
            vehicle,
            numberPlate,
            password: hashedPassword,
            Kinname,
            kinPhoneNumber,
            Relationship,
            role: role || "passenger" // 👈 default if frontend forgets
        });

        const token = jwt.sign(
            { email: result.email, id: result._id, role: result.role },
            "test",
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User created successfully",
            rider: result,
            token
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// GET driver by number plate
const getDriverByNumberPlate = async (req, res) => {
    const { numberPlate } = req.params;
    try {
        const driver = await Driver.findOne({ numberPlate });
        if (!driver) return res.status(404).json({ message: "Driver not found" });

        res.status(200).json(driver);
    } catch (error) {
        console.error("Error fetching driver:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all users controller
const getRiders = async (req, res) => {
    try {
        const riders = await Rider.find().select('-password');
        if (!riders) return res.status(404).json({ message: "User not found" });
        res.status(200).json(riders);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}



module.exports = {
    registerRider,
    getRiders,
    getDriverByNumberPlate
};
