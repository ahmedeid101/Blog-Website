//Auth Service (Business Logic)
class AuthService {
  constructor(userRepository, passwordHasher, jwtService) {
    if (!jwtService || !jwtService.generateToken) {
      throw new Error('Valid JWT service must be provided');
    }
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtService = jwtService;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordHasher.hash(userData.password);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  }

  async login(loginData){
    // Find user by email
    const user = await this.userRepository.findByEmail(loginData.email);
    if(!user) throw new Error('Invalid credentials: Something Worng with Email');

    // Verify password
    const isMatch = await this.passwordHasher.compare(
      loginData.password,
      user.password
    )
    if(!isMatch) throw new Error('Invalid credentials: Something Worng with Password');

    //Apply JWT
      const token = this.jwtService.generateToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    });

    // Return user data (excluding password)
    return {
      user: {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      isAccountVerified: user.isAccountVerified,
      profilePhoto: user.profilePhoto
      },
      token
    };
  }

  async verifyToken(token){
    return this.jwtService.verifyToken(token);
  }
}

module.exports = AuthService;

