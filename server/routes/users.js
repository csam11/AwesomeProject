// Users Routes (/routes/users.js): Handles user registration, authentication (login/logout), and user profile operations.

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
    console.log('Registering user:', req.body);
    const { email, password } = req.body;

    try {
        // Check if username and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Create a new user instance
        const newUser = new User({ email, password });

        // Save the new user to the database
        await newUser.save();

        return res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration failed:', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
    
});

// POST /api/users/login - Authenticate a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match the predefined credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

module.exports = router;