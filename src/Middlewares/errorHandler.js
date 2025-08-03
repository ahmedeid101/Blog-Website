// src/middlewares/errorHandler.js

const ErrorResponse = require("../Utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log detailed error stack in dev
  if (process.env.NODE_ENV !== "production") {
    console.error("🔥 Stack Trace:\n", err.stack);
  }

  // Mongoose: Invalid ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose: Duplicate field
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose: Validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(messages.join(" | "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};

module.exports = errorHandler;