require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const admin = require('firebase-admin'); // Import Firebase Admin SDK

const app = express();
const port = 3002;

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/User_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to User_data database');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(cors());

// Register Endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email address already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    // Handle other errors
    res.status(500).json({ error: 'Error registering user. Please try again.' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user with the provided email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: 'User not found' });
  }

  // Check if the provided password matches the user's password
  const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
  if (!isMatch) {
    return res.json({ success: false, message: 'Incorrect password' });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_SECRET, // Use the secret key from environment variables
    { expiresIn: '1h' }
  );

  // Send a response with the token
  res.json({ success: true, message: 'Login successful', token });
});

// Route for sending push notifications
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send push notification using Firebase Admin SDK
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body
      }
    });

    return res.status(200).json({ message: 'Push notification sent successfully' });
  } catch (error) {
    console.error('Error sending push notification:', error);
    return res.status(500).json({ error: 'Failed to send push notification' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
