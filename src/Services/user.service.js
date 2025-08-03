//User Service (Business Logic)
const ErrorResponse = require("../Utils/errorResponse");
const cloudinary = require('../config/cloudinaryConfig');
const {cloudinaryRemoveImage, cloudinaryRemoveMultipleImage} = require("../Utils/cloudinaryUtils");

class UserService {
  constructor(userRepository, postRepository, commentRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User Not Found");
    return user;
  }

  async updateProfile(userId, updateData) {
    // Filter only allowed fields to update
    const allowedUpdates = ['username', 'email', 'profilePhoto', 'bio'];
    const filteredUpdates = Object.keys(updateData)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    return this.userRepository.updateUser(userId, filteredUpdates);
  }

  async deleteUserProfile(userId, currentUser) {
  const user = await this.userRepository.findById(userId);
  if (!user) throw new ErrorResponse("User not found", 404);

  // Allow only admin or user himself
  if (currentUser.role !== "admin" && currentUser.id !== userId.toString()) {
    throw new ErrorResponse("Not authorized to delete this profile", 403);
  }

  // Get user's posts
  const posts = await this.postRepository.findMany({ user: user._id });
  const publicIds = posts.map(post => post.image?.publicId).filter(Boolean);

  // Remove post images from Cloudinary
  if (publicIds.length > 0) {
    await cloudinaryRemoveMultipleImage(publicIds);
  }

  // Remove profile photo
  if (user.profilePhoto?.publicId) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // Delete user's posts and comments
  await this.postRepository.deleteMany({ user: user._id });
  await this.commentRepository.deleteMany({ user: user._id });

  // Delete the user
  await this.userRepository.deleteById(userId);
}


  async getAllProfiles() {
    return this.userRepository.getAllUsers();
  }

  async getTotalUsers(role){
    const filter = role ? {role} : {};
    return this.userRepository.countUsers(filter);
  }

  async uploadProfilePhoto(userId, file){
    if(!file) throw new Error('No Fle Uploaded');

    // Upload to Cloudinary
    const result = await new Promise((res, rej) =>{
      const stream = cloudinary.uploader.upload_stream(
        {folder: 'user-profiles'},
        (error, result) =>{
          if(result) res(result);
          else rej(error);  
        }
      );
      stream.end(file.buffer);
    });
    
    // Update user profile
    return this.userRepository.updateUser(userId, {
        profilePhoto: {
          url: result.secure_url,
          publicId: result.public_id
      }
    });
  }

  async deleteProfilePhoto(publicId) {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  }
}

module.exports = UserService;