const express = require('express');
const {
  createCourse,
  getMentorCourses,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Restrict to mentors
router.use(authorize('mentor'));

router.route('/')
  .post(createCourse)
  .get(getMentorCourses);

router.route('/:id')
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router; 