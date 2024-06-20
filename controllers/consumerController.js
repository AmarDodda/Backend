const Consumer = require('../models/consumer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');

exports.register = async (request, response) => {
  try {
    const { username, password, name } = request.body;

    const existingConsumer = await Consumer.findOne({ username });
    if (existingConsumer) {
      return response.status(400).json({ message: 'Consumer already exists' });
    }

    if (!password) {
      return response.status(400).json({ message: "Password is required" });
    }

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log('Password hash:', passwordHash);

    const newConsumer = new Consumer({
      username,
      password:passwordHash,
      name,
    });

    await newConsumer.save();

    const token = jwt.sign({ id: newConsumer._id }, config.JWT_SECRET, { expiresIn: '1h' });

    response.status(201).json({ token, consumerId: newConsumer._id });
  } catch (error) {
    response.status(500).json({ message: 'Error registering consumer', error: error.message });
  }
};

// exports.login = async (request, response) => {
//   try {
//     const { username, password } = request.body;

//     const consumer = await Consumer.findOne({ username });
//     if (!consumer) {
//       return response.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await consumer.comparePassword(password);
//     // const isMatch=await bcrypt.compare(password,consumer.password)
//     if (!isMatch) {
//       return response.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: consumer._id,}, config.JWT_SECRET, { expiresIn: '1h' });

//     response.cookie('token', token, {
//       httpOnly: true,  // Cookie is accessible only through HTTP(S) requests
//       secure: true,    // Sending cookie only over HTTPS in production
//       expires: new Date(Date.now() + 3600000),  // Cookie expires in 1 hour
//     });
  

//     response.status(200).json({ token, consumerId: consumer._id });
//   } catch (error) {
//     response.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;

    // Find consumer by username
    const consumer = await Consumer.findOne({ username });
    if (!consumer) {
      return response.status(400).json({ message: 'Consumer not found' });
    }

    // Check if password is provided
    if (!password) {
      return response.status(400).json({ message: 'Password is required' });
    }

    // Compare provided password with hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, consumer.password);
    if (!isPasswordCorrect) {
      return response.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: consumer._id, username: consumer.username, name: consumer.name }, // Include any additional consumer data you want in the token payload
      config.JWT_SECRET, // Use your JWT secret key from configuration
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Set token in HTTP-only secure cookie
    response.cookie('token', token, {
      httpOnly: true, // Cookie is accessible only through HTTP(S) requests
      secure: true, // Sending cookie only over HTTPS in production
      sameSite: 'none', // Required for cross-site requests
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 24 hours
    });

    // Respond with success message and token
    response.json({ message: 'Login successful', token });
  } catch (error) {
    // Handle any errors that occur during login process
    response.status(500).json({ message: error.message });
  }
};


exports.logout = (request, response) => {
  response.status(200).json({ message: 'Logged out successfully' });
};

exports.getConsumer = async (request, response) => {
  try {
    const consumerId = request.consumerId;
    console.log(consumerId)
    const consumer = await Consumer.findById(consumerId);
    console.log('Consumer:', consumer);
    if (!consumer) {
      return response.status(404).json({ message: "Consumer not found" });
    }
    response.json({ message: "Consumer found", consumer });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


