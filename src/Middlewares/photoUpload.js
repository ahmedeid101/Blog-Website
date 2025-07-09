// const multer = require('multer');
// const { ErrorResponse } = require('../Utils/errorResponse');

// const uploadPhoto = multer({
//   storage: multer.memoryStorage(), // Store in memory for Cloudinary
//   limits: { 
//     fileSize: 5 * 1024 * 1024, // 5MB
//     files: 1 // Only one file
//   },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpe?g|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new ErrorResponse('Only images (JPEG, PNG, GIF) are allowed', 400));
//   }
// });

// module.exports = uploadPhoto.single('image'); // Field name must match Postman

const path = require("path");
const multer = require("multer");

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

module.exports = uploadPhoto.single('image');
