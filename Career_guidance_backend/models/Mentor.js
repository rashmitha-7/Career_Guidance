const mongoose = require('mongoose');

const MentorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  expertise: {
    type: [String],
    default: []
  },
  ratings: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  availability: {
    type: [String],
    default: []
  },
  languages: {
    type: [String],
    default: ['English']
  },
  image: {
    type: String,
    default: 'default-mentor.jpg'
  },
  bio: {
    type: String,
    required: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mentor', MentorSchema); 