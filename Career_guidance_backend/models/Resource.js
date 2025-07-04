const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a resource title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['engineering', 'medical', 'science', 'sports', 'mathematics', 'economics', 'government']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  link: {
    type: String,
    required: [true, 'Please add a resource link']
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', ResourceSchema); 