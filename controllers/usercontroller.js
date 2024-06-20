const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const userController = {
  register: async (request, response) => {
    try {
      const { username, password, name } = request.body;

      
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return response.status(400).json({ message: "Username already exists" });
      }

      if (!password) {
        return response.status(400).json({ message: "Password is required" });
      }

      const saltRounds = 10;

      console.log('Salt rounds:', saltRounds);

      const passwordHash = await bcrypt.hash(password, saltRounds);

      console.log('Password hash:', passwordHash);

      const role = username === process.env.ADMIN_USERNAME ? "admin" : "user";

      const newUser = new User({
        username,
        password:passwordHash,
        name,
        role,
      });

      const savedUser = await newUser.save();

      response.json({ message: "User registered", user: savedUser });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  login: async (request, response) => {
    try {
      const { username, password } = request.body;

      const user = await User.findOne({ username });
      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }

      if (!password) {
        return response.status(400).json({ message: "Password is required" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return response.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username, name: user.name },
        config.JWT_SECRET
      );

      response.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
      });

      response.json({ message: "Login successful", token });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  logout: async (request, response) => {
    try {
      response.clearCookie("token");
      response.json({ message: "Logout successful" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getUser: async (request, response) => {
    try {
      const userId = request.userId;
      console.log(userId);
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      response.json({ message: "User found", user });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  updateUser: async (request, response) => {
    try {
      const userId = request.userId;
      const { username, name } = request.body;
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      user.username = username ? username : user.username;
      user.name = name ? name : user.name;
      const updatedUser = await user.save();
      response.json({ message: "User updated", user: updatedUser });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (request, response) => {
    try {
      const userId = request.userId;
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      await User.findByIdAndDelete(userId);
      response.clearCookie("token");
      response.json({ message: "User deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getUsers: async (request, response) => {
    try {
      const users = await User.find();
      response.json({ message: "Users found", users });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  getUserById: async (request, response) => {
    try {
      const userId = request.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      response.json({ message: "User found", user });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  updateUserById: async (request, response) => {
    try {
      const userId = request.params.id;
      const { username, name } = request.body;
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      user.username = username ? username : user.username;
      user.name = name ? name : user.name;
      const updatedUser = await user.save();
      response.json({ message: "User updated", user: updatedUser });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  deleteUserById: async (request, response) => {
    try {
      const userId = request.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      await User.findByIdAndDelete(userId);
      response.json({ message: "User deleted" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
