const express = require('express');
const router = express.Router();
const {
  getResources,
  getResourcesByCategory,
  addResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getResources);
router.get('/category/:category', getResourcesByCategory);

// Protected routes (mentor only)
router.post('/', protect, addResource);
router.put('/:id', protect, updateResource);
router.delete('/:id', protect, deleteResource);

module.exports = router; 