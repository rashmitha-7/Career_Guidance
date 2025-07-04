const Resource = require('../models/Resource');
const Mentor = require('../models/Mentor');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate('mentor', 'name title');
    
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get resources by category
// @route   GET /api/resources/category/:category
// @access  Public
exports.getResourcesByCategory = async (req, res) => {
  try {
    const resources = await Resource.find({ category: req.params.category })
      .populate('mentor', 'name title');
    
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add new resource
// @route   POST /api/resources
// @access  Private (Mentor only)
exports.addResource = async (req, res) => {
  try {
    // Check if user is a mentor
    const mentor = await Mentor.findOne({ user: req.user.id });
    if (!mentor) {
      return res.status(403).json({
        success: false,
        message: 'Only mentors can add resources'
      });
    }

    const resource = await Resource.create({
      ...req.body,
      mentor: mentor._id
    });

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private (Mentor only)
exports.updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if the mentor owns this resource
    const mentor = await Mentor.findOne({ user: req.user.id });
    if (resource.mentor.toString() !== mentor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resource'
      });
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private (Mentor only)
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if the mentor owns this resource
    const mentor = await Mentor.findOne({ user: req.user.id });
    if (resource.mentor.toString() !== mentor._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resource'
      });
    }

    await resource.remove();

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