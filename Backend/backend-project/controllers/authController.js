const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const validateLebanesePhoneNumber = function (value) {
  const phoneNumberRegex = /^\+961\d{8}$/; // Regex for '+961' followed by 8 digits
  return phoneNumberRegex.test(value);
};

exports.registerUser = async (req, res) => {
  try {
    // Perform validations using validateRegisterUser function
    const { error } = validateRegisterUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    if (
      validator.isEmpty(req.body.phoneNumber) ||
      !validator.isNumeric(req.body["phoneNumber"]) ||
      !validateLebanesePhoneNumber(req.body["phoneNumber"])
    ) {
      return res.status(404).send({ message: "phone number must be valid" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user instance
    const newUser = new User({
      userName: req.body.userName,
      lastName: req.body.lastName,
      lastName: req.body.lastName,
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
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "Incorrect " });
  }

  const isPasswordConfirmed = await bcrypt.compare(
    req.body.password, user.password
  );
  if (!isPasswordConfirmed) {
    return res.status(401).json({ message: "Incorrect credentials" });
  }
  // Generate JWT token
  const token = user.generateAuthToken();

  return res.status(200).json({
    _id: user._id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePhoto: user.profilePhoto,
    phoneNumber: user.phoneNumber,
    token,
  });
};
