const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");


exports.registerUser = async (req, res) => {
  try {
    // Perform validations using validateRegisterUser function
    const { error } = validateRegisterUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body['email'] });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user instance
    const newUser = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber:  req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
      passwordChangeAt: Date.now()
    });

    // Save the new user to the database
    await newUser.save();
    return res.status(201).json({
      message: "User saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
    try {
        // Validate request body
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        // Return user data and token
        return res.status(200).json({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePhoto: user.profilePhoto,
            phoneNumber: user.phoneNumber,
            token,
        });
    } catch (error) {
        // Handle server errors
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
