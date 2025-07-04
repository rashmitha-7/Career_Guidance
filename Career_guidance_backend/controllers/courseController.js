const Course = require('../models/Course');
const Mentor = require('../models/Mentor');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a course
// @route   POST /api/v1/courses
// @access  Private (Mentor only)
exports.createCourse = asyncHandler(async (req, res, next) => {
  // Add mentor to req.body
  req.body.mentor = req.user.id;

  const course = await Course.create(req.body);

  // Add course to mentor's courses
  await Mentor.findOneAndUpdate(
    { user: req.user.id },
    { $push: { courses: course._id } }
  );

  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc    Get all courses for a mentor
// @route   GET /api/v1/courses/mentor
// @access  Private (Mentor only)
exports.getMentorCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ mentor: req.user.id })
    .populate('students', 'name email');

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private (Mentor only)
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse('Course not found', 404));
  }

  // Make sure mentor owns the course
  if (course.mentor.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this course', 401));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private (Mentor only)
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse('Course not found', 404));
  }

  // Make sure mentor owns the course
  if (course.mentor.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to delete this course', 401));
  }

  await course.remove();

  // Remove course from mentor's courses
  await Mentor.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { courses: course._id } }
  );

  res.status(200).json({
    success: true,
    data: {}
  });
}); 