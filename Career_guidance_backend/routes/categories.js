const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  getCategoryByPath,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Protected routes
router.post('/', protect, authorize('mentor', 'admin'), createCategory);
router.put('/:id', protect, authorize('admin'), updateCategory);
router.delete('/:id', protect, authorize('admin'), deleteCategory);

router.get('/path/:pathName', getCategoryByPath);

module.exports = router; 