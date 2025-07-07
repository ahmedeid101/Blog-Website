const path = require("path");
const multer = require("multer");
const { ErrorResponse } = require('../Utils/errorResponse');

// //using cloud
const uploadPhoto = multer({
  storage: multer.memoryStorage(), // Store in memory for Cloudinary
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    // 1. Check if file exists
    if (!file) {
      return cb(new Error('No file uploaded'));
    }

    // 2. Validate file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif'];
    
    // 3. Validate MIME type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!allowedExts.includes(ext) || !allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG/PNG/GIF images are allowed'));
    }

    cb(null, true);
  }
});

module.exports = uploadPhoto.single('profilePhoto');
