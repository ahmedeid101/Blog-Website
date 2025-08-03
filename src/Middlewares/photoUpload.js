const path = require("path");
const multer = require("multer");

// Multer config for in-memory image storage (for Cloudinary)
const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif'];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedExts.includes(ext) || !allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG/PNG/GIF images are allowed'));
    }

    cb(null, true);
  }
}).single('image');

// Wrapper with error handling
const uploadPhotoErrorHandler = (req, res, next) => {
  uploadPhoto(req, res, function (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    next();
  });
};

module.exports = uploadPhotoErrorHandler;