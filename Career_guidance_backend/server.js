const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Load models
const User = require('./models/User');
const UserProfile = require('./models/UserProfile');
const Booking = require('./models/Booking');
const Mentor = require('./models/Mentor');

// Load controllers
const userProfileController = require('./controllers/userProfileController');

// Load routes
const authRoutes = require('./routes/auth');
const bookingsRoutes = require('./routes/bookings');
const mentorRoutes = require('./routes/mentor');
const courseRoutes = require('./routes/courses');
const resourceRoutes = require('./routes/resources');
const categoriesRoutes = require('./routes/categories');
const quizRoutes = require('./routes/quizRoutes');

// Mock data
const categories = require('./data/categories');
const mentors = require('./data/mentors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB - now optional
try {
  connectDB();
  console.log('Attempting to connect to MongoDB...');
} catch (err) {
  console.log('MongoDB connection failed, but server will continue running in mock mode');
}

// Middleware
app.use(express.json());
app.use(cors());

// Serve static mentor images from the public/mentors directory
app.use('/mentors', express.static(path.join(__dirname, 'public/mentors')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/v1/mentors', mentorRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/quizzes', quizRoutes);

// Category API Routes
// app.get('/api/categories', (req, res) => {
//   res.json({
//     success: true,
//     count: categories.length,
//     data: categories
//   });
// });

// app.get('/api/categories/:id', (req, res) => {
//   const category = categories.find(c => c.id === parseInt(req.params.id));
//   if (!category) {
//     return res.status(404).json({
//       success: false,
//       message: 'Category not found'
//     });
//   }
//   res.json({
//     success: true,
//     data: category
//   });
// });

// app.get('/api/categories/path/:pathName', (req, res) => {
//   const pathToFind = `/${req.params.pathName}`;
//   const category = categories.find(c => c.path === pathToFind);
//   if (!category) {
//     return res.status(404).json({
//       success: false,
//       message: 'Category not found'
//     });
//   }
//   res.json({
//     success: true,
//     data: category
//   });
// });

// Mentor API Routes
app.get('/api/mentors', async (req, res) => {
  try {
    const mentors = await Mentor.find().distinct('_id').then(async (ids) => {
      return await Mentor.find({ _id: { $in: ids } });
    });
  res.json({
    success: true,
      count: mentors.length,
      data: mentors
  });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/mentors/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
  if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
  }
    res.json({ success: true, data: mentor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/mentors/category/:category', (req, res) => {
  const filteredMentors = mentors.filter(m => 
    m.categories.includes(req.params.category)
  );
  
  res.json({
    success: true,
    count: filteredMentors.length,
    data: filteredMentors
  });
});

// Authentication endpoints
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('Attempting registration for:', email);

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error details:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
});

// Use the auth controller for login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Authentication middleware
const protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token in mock mode
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      // Set mock user
      req.user = {
        _id: 'mock-user-id',
        name: 'Mock User',
        email: 'mock@example.com',
        role: 'user'
      };
      
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error in auth middleware'
    });
  }
};

// Protected route to get current user
app.get('/api/auth/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Mock user profile data
const mockProfile = {
  user: 'mock-user-id',
  interests: ['Career Development', 'Software Engineering'],
  savedCategories: [1, 3],
  savedMentors: ['mentor1', 'mentor2'],
  educationHistory: [
    {
      institution: 'Mock University',
      degree: 'BS',
      fieldOfStudy: 'Computer Science',
      from: '2018-08-01',
      to: '2022-05-31',
      current: false,
      description: 'Mock degree'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  bio: 'This is a mock user profile for testing purposes',
  preferences: { notifications: true, theme: 'light' }
};

// User Profile API Routes
app.get('/api/profile/me', protect, (req, res) => {
  res.json({
    success: true,
    data: mockProfile,
    message: 'Mock profile returned - database connection unavailable'
  });
});

app.post('/api/profile', protect, (req, res) => {
  const updatedProfile = { ...mockProfile };
  if (req.body.interests) updatedProfile.interests = req.body.interests;
  if (req.body.savedCategories) updatedProfile.savedCategories = req.body.savedCategories;
  if (req.body.savedMentors) updatedProfile.savedMentors = req.body.savedMentors;
  if (req.body.bio) updatedProfile.bio = req.body.bio;
  if (req.body.skills) updatedProfile.skills = req.body.skills;
  
  res.json({
    success: true,
    data: updatedProfile,
    message: 'Mock profile updated - database connection unavailable'
  });
});

app.put('/api/profile/education', protect, (req, res) => {
  const newEdu = req.body;
  const updatedProfile = { ...mockProfile };
  updatedProfile.educationHistory = [newEdu, ...mockProfile.educationHistory];
  
  res.json({
    success: true,
    data: updatedProfile,
    message: 'Mock education added - database connection unavailable'
  });
});

app.put('/api/profile/skills', protect, (req, res) => {
  const { skill } = req.body;
  const updatedProfile = { ...mockProfile };
  if (!updatedProfile.skills.includes(skill)) {
    updatedProfile.skills.push(skill);
  }
  
  res.json({
    success: true,
    data: updatedProfile,
    message: 'Mock skill added - database connection unavailable'
  });
});

// Original userProfileController endpoints commented out
// app.get('/api/profile/me', protect, userProfileController.getCurrentProfile);
// app.post('/api/profile', protect, userProfileController.createOrUpdateProfile);
// app.put('/api/profile/education', protect, userProfileController.addEducation);
// app.put('/api/profile/skills', protect, userProfileController.addSkill);

// Booking endpoint
app.post('/api/bookings', protect, async (req, res) => {
  try {
    // Get user ID from authentication
    const userId = req.user.id;
    
    const bookingData = {
      user: userId,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // In a real implementation, we would save this to the database
    // For this demo, we'll just return a success response
    
    res.status(201).json({
      success: true,
      data: {
        _id: 'bookingid' + Date.now(),
        ...bookingData
      },
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Update quiz count
app.put('/api/auth/update-quiz-count', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Increment quiz count
    user.quizCount += 1;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        quizCount: user.quizCount
      }
    });
  } catch (error) {
    console.error('Update quiz count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during quiz count update'
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'API Running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

exports.getBooking = async (req, res) => {
  try {
    const bookingId = mongoose.Types.ObjectId(req.params.id);
    const booking = await Booking.findById(bookingId)
      .populate('user', 'name email')
      .populate('mentor', 'name');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}; 

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
}); 