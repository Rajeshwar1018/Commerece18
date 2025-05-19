const User = require("../Models/User");
const generateToken = require("../utils/jwt");
const bcrypt = require("bcryptjs");

class UserService {
  async register({ username, email, password, role }) {
    try {
      if (await User.findOne({ email })) return { message: "User already exists" };

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword, role });

      return { message: "User created", user: { id: user._id, email: user.email } };
    } catch (err) {
      return { message: "Register error", error: err.message };
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { message: "Invalid credentials" };
      }

      const token = generateToken(user._id, user.role);
      return { message: "Login successful", token };
    } catch (err) {
      return { message: "Login error", error: err.message };
    }
  }
}

module.exports = new UserService();
