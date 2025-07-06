//User Repository (Data Access Layer)

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(userId){
    return this.model.findById(userId).select('-password');
  }

    async findByEmail(email) {
    return this.model.findOne({ email });
  }
  
  async updateUser(userId, updateData){
    return this.model.findByIdAndUpdate(
        userId,
        updateData,
        {new: true, runValidators: true}
    ).select('-password');
  }

    async deleteUser(id) {
    return this.model.findByIdAndDelete(id);
  }

  async getAllUsers() {
    return this.model.find().select('-password');
  }

  async countUsers(filter = {}){
    return this.model.countDocuments(filter);
  }

}

module.exports = UserRepository;