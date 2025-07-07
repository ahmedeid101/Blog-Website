//User Service (Business Logic)
const { error } = require('winston');
const cloudinary = require('../Utils/cloudinary');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
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

  async deleteProfile(userId) {
    return this.userRepository.deleteUser(userId);
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