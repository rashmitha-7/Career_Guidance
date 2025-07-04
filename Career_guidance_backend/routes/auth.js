const express = require('express');
const router = express.Router();
const { register, login, getMe, updateQuizCount, loginStudent, loginMentor, updateDetails, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Routes
router.post('/register', register);
router.post('/login', login);
router.post('/login/student', loginStudent);
router.post('/login/mentor', loginMentor);
router.get('/me', protect, getMe);
router.put('/update-quiz-count', protect, updateQuizCount);
router.put('/update-details', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router; 