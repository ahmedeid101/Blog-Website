// src/auth/middleware/authMiddleware.js
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../Utils/errorResponse');
const User = require('../Models/User'); // Make sure to import your User model
const jwt = require('jsonwebtoken');


const authMiddleware = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    let token;

    // 1. Get token from header or cookie
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Debugging: Log token source
    console.log(`Token source: ${token ? 'Found' : 'Missing'}`);

    if (!token) {
      console.error('No token provided in request');
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log('Decoded token:', decoded);

      // 3. Check if user exists
      const user = await User.findById(decoded.id).select('+passwordChangedAt');
      if (!user) {
        console.error('User not found for token:', decoded.id);
        return next(new ErrorResponse('User no longer exists', 401));
      }

      // 4. Check password change timestamp
      if (user.changedPasswordAfter(decoded.iat)) {
        console.warn('Password changed after token issued for user:', user.email);
        return next(new ErrorResponse('Please log in again', 401));
      }

      // 5. Role verification
      if (roles.length > 0 && !roles.includes(user.role)) {
        console.warn(`Role ${user.role} not in required roles: ${roles}`);
        return next(
          new ErrorResponse(`Insufficient permissions`, 403)
        );
      }

      // 6. Attach user to request
      req.user = user;
      console.log('Authenticated user:', user.email);
      next();
    } catch (err) {
      console.error('Token verification failed:', err.message);
      
      // Specific error messages
      let message = 'Not authorized';
      if (err.name === 'TokenExpiredError') {
        message = 'Session expired. Please log in again';
      } else if (err.name === 'JsonWebTokenError') {
        message = 'Invalid token';
      }

      return next(new ErrorResponse(message, 401));
    }
  });
};

module.exports = authMiddleware;