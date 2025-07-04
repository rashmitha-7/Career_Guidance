const mongoose = require('mongoose');

const UserProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  interests: {
    type: [String],
    default: []
  },
  savedCategories: [{
    type: Number,
    ref: 'Category'
  }],
  savedMentors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
  }],
  educationHistory: [{
    institution: {
      type: String
    },
    degree: {
      type: String
    },
    fieldOfStudy: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  skills: {
    type: [String],
    default: []
  },
  bio: {
    type: String
  },
  preferences: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema); 