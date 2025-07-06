class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish operational errors from programming errors
    
    // Capture stack trace (excluding constructor call)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;