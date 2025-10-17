const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/users"); // ✅ make sure the file is named `user.js`, not `users.js`

const register = async (req, res) => {
  const {firstname,lastname,email,password,confirmpassword,phoneNumber,Gender,NIN,Kinname,KinPhoneNumber,Relationship} = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Check password match
    if (password !== confirmpassword)
      return res.status(400).json({ message: "Password mismatch" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with all required fields
    const result = await User.create({
      name: `${firstname} ${lastname}`,
      email,
      password: hashedPassword,
      phoneNumber,
      Gender,
      NIN,
      Kinname,
      KinPhoneNumber,
      Relationship,
      
    });

    // Generate JWT token
    const token = jwt.sign({ 
      id: result._id, 
      email: result.email,
       role: result.role }, 
       "test", { expiresIn: "1h" });

    res
      .status(201)
      .json({ message: "User created successfully", user: result, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

//get all users controller
const getUsers = async (req, res) =>{
   
    try {
        const users = await User.find().select('-password');
        if(!users) return res.status(404).json({message: "User not found"}); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

//get userby id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: ensure the logged-in user matches the ID being requested
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//controller
const getMyProfile = async (req, res) => {
  try {
    // Use the user ID from the token
    const passenger = await User.findById(req.user.id);

    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports ={
                 register,
                 getUsers,
            
                 getUserById,
                 getMyProfile
                };
