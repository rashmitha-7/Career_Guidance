const express = require('express');
const router = express.Router();
const {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    submitQuiz
} = require('../controllers/quizController');
const { protect, admin, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getQuizzes);
router.get('/:id', getQuiz);

// Protected routes
router.post('/:id/submit', protect, submitQuiz);

// Admin/Mentor routes
router.post('/', protect, authorize('mentor', 'admin'), createQuiz);
router.put('/:id', protect, updateQuiz);
router.delete('/:id', protect, deleteQuiz);

module.exports = router; 