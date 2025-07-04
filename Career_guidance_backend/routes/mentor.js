const express = require('express');
const {
  registerMentor,
  loginMentor,
  getMe
} = require('../controllers/mentorAuthController');

const {
  getMentorStudents,
  getMentorCourses,
  updateMentorProfile,
  getDashboardStats
} = require('../controllers/mentorDashboardController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', registerMentor);
router.post('/login', loginMentor);
router.get('/me', protect, getMe);

// Dashboard routes
router.get('/students', protect, getMentorStudents);
router.get('/courses', protect, getMentorCourses);
router.put('/profile', protect, updateMentorProfile);
router.get('/dashboard', protect, getDashboardStats);

module.exports = router; 