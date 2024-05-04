const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateRegisterUser,validateLoginUser } = require('../model/User');


/*----------------------------------------------------------------
 * @desc Registers a user
 * @route /api/auth/register
 * @method post
 * @access public
----------------------------------------------------------------- */
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // Perform validations using validateRegisterUser function
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user instance
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save the new user to the database
  await newUser.save();

  return res.status(201).json({
    message: 'User saved successfully',
  });
});

/*----------------------------------------------------------------
 * @desc Login a user
 * @route /api/auth/login
 * @method post
 * @access public
----------------------------------------------------------------- */
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  /*----------------------------------------------------------------
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);    
  if (user.password !== hashedPassword) {                               OR
    return res.status(401).json({ message: "Incorrect password" });
  }
  ----------------------------------------------------------------*/
  const isPasswordConfirmed = await bcrypt.compare(req.body.password,user.password);
  if(!isPasswordConfirmed) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  // Generate JWT token
  const token = user.generateAuthToken();
  // Return the token in the response
  return res.status(200).json({ 
    _id: user._id,
    username: user.username,
    profilePhoto: user.profilePhoto,
    isAdmin : user.isAdmin,
    token
  });
});