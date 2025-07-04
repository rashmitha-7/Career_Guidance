const Booking = require('../models/Booking');
const Mentor = require('../models/Mentor');
const mongoose = require('mongoose');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'mentor',
        select: 'name'
      });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'mentor',
        select: 'name'
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking not found with id of ${req.params.id}`
      });
    }

    // Make sure user is booking owner or admin
    if (
      booking.user._id.toString() !== req.user.id &&
      req.user.role !== 'admin' &&
      booking.mentor.user.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add booking
// @route   POST /api/bookings
// @access  Private
exports.addBooking = async (req, res) => {
  console.log('Received request to add booking.');
  console.log('Request body:', req.body);
  try {
    let { mentor, date, timeSlot, topic } = req.body;
    // Convert mentor to ObjectId if it's a string
    if (typeof mentor === 'string') {
      mentor = new mongoose.Types.ObjectId(mentor);
      console.log('Converted mentor ID string to ObjectId:', mentor);
    }
    console.log('Mentor ID after conversion:', mentor);
    // Check if mentor exists
    const mentorExists = await Mentor.findById(mentor);
    console.log('Mentor exists check result:', !!mentorExists);
    if (!mentorExists) {
      return res.status(404).json({
        success: false,
        message: `Mentor not found with id of ${mentor}`
      });
    }
    console.log('Checking for existing booking...');
    // Check if time slot is available
    const existingBooking = await Booking.findOne({
      mentor,
      date,
      timeSlot,
      status: { $ne: 'cancelled' }
    });
    console.log('Existing booking check result:', !!existingBooking);
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }
    console.log('Attempting to create booking...');
    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      mentor,
      date,
      timeSlot,
      topic
    });
    console.log('Booking created successfully:', booking);
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBookingStatus = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking not found with id of ${req.params.id}`
      });
    }

    // Get mentor from database
    const mentor = await Mentor.findById(booking.mentor);

    // Check if user is booking owner or mentor or admin
    if (
      booking.user.toString() !== req.user.id &&
      mentor.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Update booking
    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get bookings for current user
// @route   GET /api/bookings/me
// @access  Private
exports.getMyBookings = async (req, res) => {
  console.log('Backend: getMyBookings called.');
  console.log('Backend: User ID from token (req.user.id):', req.user.id);
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'mentor',
        select: 'name' // Ensure we select the mentor's name
      });

    console.log('Backend: Bookings found for user:', bookings.length);
    console.log('Backend: Bookings data:', bookings);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Backend: Error in getMyBookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message // Send error message for debugging
    });
  }
};

// @desc    Get bookings for a mentor
// @route   GET /api/bookings/mentor/:mentorId
// @access  Private
exports.getMentorBookings = async (req, res) => {
  console.log('Received request for getMentorBookings');
  try {
    const { mentorId } = req.params;

    console.log('Mentor ID from params:', mentorId);

    // Validate if mentorId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      console.error('Invalid mentorId received:', mentorId);
      return res.status(400).json({
        success: false,
        message: 'Invalid mentor ID format.'
      });
    }

    console.log('Mentor ID is valid ObjectId', mentorId);

    // Get mentor to check ownership
    const mentor = await Mentor.findById(mentorId);

    console.log('Mentor found:', mentor ? mentor.id : 'None');

    if (!mentor) {
      console.error('Mentor not found with ID:', mentorId);
      return res.status(404).json({
        success: false,
        message: `Mentor not found with id of ${mentorId}`
      });
    }

    // Make sure user is mentor owner or admin
    if (!req.user || (mentor.user.toString() !== req.user.id && req.user.role !== 'admin')) {
       console.error('User not authorized to access these bookings. Req user ID:', req.user?.id, 'Mentor user ID:', mentor.user.toString());
       return res.status(401).json({
        success: false,
        message: 'Not authorized to access these bookings'
      });
    }

    console.log('User authorized. Fetching bookings for mentor:', mentorId);

    console.log('Executing Booking.find query...');
    const bookings = await Booking.find({ mentor: mentorId })
      .populate({
        path: 'user',
        select: 'name email'
      });
    console.log('Booking.find query executed.');

    console.log('Fetched bookings count:', bookings.length);
    if (bookings.length > 0) {
      console.log('First booking user data:', bookings[0].user);
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
    console.log('Response sent for getMentorBookings');

  } catch (error) {
    console.error('Error in getMentorBookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { mentor, date, time, topic } = req.body;
    const booking = await Booking.create({ user: req.user.id, mentor, date, time, topic });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getUpcomingBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id, date: { $gte: new Date() } })
      .populate('mentor', 'name')
      .sort('date');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}; 