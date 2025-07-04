const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get category by path
// @route   GET /api/categories/path/:pathName
// @access  Public
exports.getCategoryByPath = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.pathName });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found with name of ${req.params.pathName}`
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Mentor, Admin)
exports.createCategory = async (req, res) => {
  try {
    console.log('Received request to create category.');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Ensure the ID is correctly passed to the enum in the schema
    // The frontend sends `id` as the slugified name, which matches our enum requirement.
    const categoryData = {
      id: req.body.id, // Assuming id is already set by frontend as slugified name
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      subcategories: req.body.subcategories || [],
      count: (req.body.subcategories && req.body.subcategories.length) || 0 // Set count based on number of subcategories
    };

    const category = await Category.create(categoryData);

    console.log('Category created successfully:', category);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    // Provide a more specific error message from Mongoose if available
    let errorMessage = 'Server Error';
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      errorMessage = `Validation Error: ${messages.join(', ')}`;
    } else if (error.code === 11000) {
      errorMessage = 'Duplicate key error: A category with this ID/name already exists.';
    } else {
      errorMessage = error.message || 'Server Error';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findOne({ id: req.params.id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const updatedCategoryData = {
      ...req.body,
      count: (req.body.subcategories && req.body.subcategories.length) || 0 // Update count based on number of subcategories
    };

    category = await Category.findOneAndUpdate(
      { id: req.params.id },
      updatedCategoryData,
      {
      new: true,
      runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    await category.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}; 