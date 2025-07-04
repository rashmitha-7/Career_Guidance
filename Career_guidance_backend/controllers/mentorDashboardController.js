const Mentor = require('../models/Mentor');
const User = require('../models/User');
const Booking = require('../models/Booking');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get mentor's students
// @route   GET /api/v1/mentors/students
// @access  Private
exports.getMentorStudents = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ mentor: req.user.id })
    .populate({
      path: 'user',
      select: 'name email'
    })
    .populate('course', 'title description');

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get mentor's courses
// @route   GET /api/v1/mentors/courses
// @access  Private
exports.getMentorCourses = asyncHandler(async (req, res, next) => {
  const mentor = await Mentor.findOne({ user: req.user.id })
    .populate({
      path: 'courses',
      select: 'title description category price students'
    });

  if (!mentor) {
    return next(new ErrorResponse('Mentor not found', 404));
  }

  res.status(200).json({
    success: true,
    count: mentor.courses.length,
    data: mentor.courses
  });
});

// @desc    Update mentor profile
// @route   PUT /api/v1/mentors/profile
// @access  Private
exports.updateMentorProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    title: req.body.title,
    experience: req.body.experience,
    education: req.body.education,
    categories: req.body.categories,
    expertise: req.body.expertise,
    hourlyRate: req.body.hourlyRate,
    availability: req.body.availability,
    languages: req.body.languages,
    bio: req.body.bio
  };

  const mentor = await Mentor.findOneAndUpdate(
    { user: req.user.id },
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: mentor
  });
});

// @desc    Get mentor dashboard stats
// @route   GET /api/v1/mentors/dashboard
// @access  Private
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const mentor = await Mentor.findOne({ user: req.user.id });
  
  const totalStudents = await Booking.countDocuments({ mentor: req.user.id });
  const totalCourses = mentor.courses ? mentor.courses.length : 0;
  const totalEarnings = await Booking.aggregate([
    { $match: { mentor: req.user.id } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      totalCourses,
      totalEarnings: totalEarnings[0]?.total || 0,
      rating: mentor.ratings,
      reviewCount: mentor.reviewCount
    }
  });
}); 