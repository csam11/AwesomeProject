// Users Routes (/routes/users.js): Handles user registration, authentication (login/logout), and user profile operations.

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
    console.log('Registering user:', req.body);
    const { username, email, password } = req.body;
    console.log('username:', username);
    console.log('email:', email);
    console.log('password:', password);

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
        const newUser = new User({ username, email, password }); // Assign email value to username

        // Save the new user to the database
        await newUser.save();

        console.log('Registration successful');
        return res.status(200).json({ message: 'Registration successful' });
        
    } catch (error) {
        console.error('Registration failed:', error);
        console.log('Registration failed');
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