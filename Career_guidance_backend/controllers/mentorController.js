const Mentor = require('../models/Mentor');
const User = require('../models/User');

// @desc    Get all mentors
// @route   GET /api/mentors
// @access  Public
exports.getMentors = async (req, res) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Mentor.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Mentor.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const mentors = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: mentors.length,
      pagination,
      data: mentors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single mentor
// @route   GET /api/mentors/:id
// @access  Public
exports.getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: `Mentor not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create a mentor profile
// @route   POST /api/mentors
// @access  Private
exports.createMentor = async (req, res) => {
  try {
    // Check if mentor profile already exists
    const existingMentor = await Mentor.findOne({ user: req.user.id });
    
    if (existingMentor) {
      return res.status(400).json({
        success: false,
        message: 'Mentor profile already exists for this user'
      });
    }

    // Add user to body
    req.body.user = req.user.id;

    // Create mentor
    const mentor = await Mentor.create(req.body);

    // Update user role to mentor
    await User.findByIdAndUpdate(req.user.id, { role: 'mentor' });

    res.status(201).json({
      success: true,
      data: mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update mentor profile
// @route   PUT /api/mentors/:id
// @access  Private
exports.updateMentor = async (req, res) => {
  try {
    let mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: `Mentor not found with id of ${req.params.id}`
      });
    }

    // Make sure user is mentor owner
    if (mentor.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this mentor profile`
      });
    }

    mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}; 