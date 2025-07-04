const UserProfile = require('../models/UserProfile');

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id })
      .populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found for this user'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  const {
    interests,
    savedCategories,
    savedMentors,
    educationHistory,
    skills,
    bio,
    preferences
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (interests) profileFields.interests = interests;
  if (savedCategories) profileFields.savedCategories = savedCategories;
  if (savedMentors) profileFields.savedMentors = savedMentors;
  if (educationHistory) profileFields.educationHistory = educationHistory;
  if (skills) profileFields.skills = skills;
  if (bio) profileFields.bio = bio;
  if (preferences) profileFields.preferences = preferences;

  try {
    let profile = await UserProfile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await UserProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate('user', ['name', 'email']);
      
      return res.json({
        success: true,
        data: profile,
        message: 'Profile updated'
      });
    }

    // Create
    profile = new UserProfile(profileFields);
    await profile.save();
    
    res.json({
      success: true,
      data: profile,
      message: 'Profile created'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add education to profile
// @route   PUT /api/profile/education
// @access  Private
exports.addEducation = async (req, res) => {
  const {
    institution,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    institution,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    profile.educationHistory.unshift(newEdu);
    await profile.save();

    res.json({
      success: true,
      data: profile,
      message: 'Education added'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add skill to profile
// @route   PUT /api/profile/skills
// @access  Private
exports.addSkill = async (req, res) => {
  const { skill } = req.body;

  try {
    const profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill);
      await profile.save();
    }

    res.json({
      success: true,
      data: profile,
      message: 'Skill added'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}; 