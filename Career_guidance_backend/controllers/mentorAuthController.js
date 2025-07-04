const User = require('../models/User');
const Mentor = require('../models/Mentor');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register mentor
// @route   POST /api/v1/mentors/register
// @access  Public
exports.registerMentor = asyncHandler(async (req, res, next) => {
  const { name, email, password, title, experience, education, categories, bio } = req.body;

  // Create user with mentor role
  const user = await User.create({
    name,
    email,
    password,
    role: 'mentor'
  });

  // Create mentor profile
  const mentor = await Mentor.create({
    user: user._id,
    name,
    title,
    experience,
    education,
    categories,
    bio
  });

  sendTokenResponse(user, mentor, 201, res);
});

// @desc    Login mentor
// @route   POST /api/v1/mentors/login
// @access  Public
exports.loginMentor = asyncHandler(async (req, res, next) => {
  console.log('Mentor login endpoint hit.');
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if user is a mentor
  if (user.role !== 'mentor') {
    return next(new ErrorResponse('Not authorized as a mentor', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Find the corresponding Mentor document
  const mentor = await Mentor.findOne({ user: user._id });

  if (!mentor) {
    // This case should ideally not happen if user with role 'mentor' exists, but good for safety
    return next(new ErrorResponse('Mentor profile not found', 404));
  }

  // Pass both user and mentor data to sendTokenResponse
  console.log('Sending token response. User ID:', user._id, 'Mentor ID:', mentor._id);
  sendTokenResponse(user, mentor, 200, res);
});

// @desc    Get current logged in mentor
// @route   GET /api/v1/mentors/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const mentor = await Mentor.findOne({ user: req.user.id }).populate('user', 'name email');
  
  res.status(200).json({
    success: true,
    data: mentor
  });
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, mentor, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Set cookie expiration to 30 days from now
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mentorId: mentor._id
      }
    });
}; 