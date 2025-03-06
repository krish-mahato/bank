const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      address
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
