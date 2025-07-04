const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log('Protect middleware entered.');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    console.log('Token extracted:', token ? '[token_present]' : '[no_token]');
  }

  // Make sure token exists
  if (!token) {
    console.log('No token found in protect middleware.');
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    console.log('Token decoded:', decoded);

    req.user = await User.findById(decoded.id);
    console.log('User fetched from token:', req.user ? req.user.email : '[user_not_found]');

    next();
  } catch (err) {
    console.error('Error in protect middleware (token verification):', err.message);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log('Authorize middleware entered. Required roles:', roles);
    if (!req.user) {
      console.log('Authorize: req.user is undefined.');
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated for authorization check' 
      });
    }
    console.log('Authorize: User role:', req.user.role);
    if (!roles.includes(req.user.role)) {
      console.log(`Authorize: User role ${req.user.role} is not authorized.`);
      return res.status(403).json({ 
        success: false, 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }
    console.log('Authorize: User is authorized.');
    next();
  };
}; 