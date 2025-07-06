//User Service (Business Logic)
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
}

module.exports = UserService;