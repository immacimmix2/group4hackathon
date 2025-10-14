const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/users");

const register = async (req, res) => {
  const { email, password, confirmpassword, firstname, lastname,phoneNumber,Gender,NIN,Kinname,KinPhoneNumber,Relationship } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "Password mismatch" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created successfully", result, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = register;
