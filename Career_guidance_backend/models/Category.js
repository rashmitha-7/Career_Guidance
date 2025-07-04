const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    // Removed the enum constraint to allow dynamic category IDs
    // enum: ['engineering', 'medical', 'science', 'sports', 'mathematics', 'economics', 'government']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    // default: 0 // Remove default as count will be dynamic
  },
  subcategories: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema); 