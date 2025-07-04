const express = require('express');
const router = express.Router();
const {
  getMentors,
  getMentor,
  createMentor,
  updateMentor
} = require('../controllers/mentorController');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(getMentors)
  .post(protect, createMentor);

router.route('/:id')
  .get(getMentor)
  .put(protect, updateMentor);

module.exports = router; 