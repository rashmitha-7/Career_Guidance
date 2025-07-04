const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  addBooking,
  updateBookingStatus,
  getMyBookings,
  getMentorBookings,
  createBooking,
  getUpcomingBookings
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(protect, authorize('admin'), getBookings)
  .post(protect, addBooking);

// Specific routes should come before generic ones
router.get('/me', protect, getMyBookings);
router.get('/mentor/:mentorId', protect, getMentorBookings);
router.post('/bookings', protect, createBooking);
router.get('/upcoming', protect, getUpcomingBookings);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBookingStatus);

module.exports = router; 