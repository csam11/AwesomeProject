const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/progress');

router.post('/addWeight', auth, async (req, res) => {
    try {
        const { weight, date } = req.body; // Extract weight and date from request body
        const userId = req.user._id; // Assuming you have middleware to extract user ID from token
        
        // Create a new weight entry object
        const newWeightEntry = {
            weight: parseFloat(weight),
            date: date,
        };

        // Find the user's progress document and push the new weight entry
        const progress = await Progress.findOneAndUpdate(
            { user: userId }, // Find progress document by user ID
            { $push: { weightTrack: newWeightEntry } }, // Push the new weight entry
            { new: true, upsert: true } // Create progress document if not exists
        );

        // Respond with a success message or the updated progress data
        res.json({ message: "success", progress });
    } catch (error) {
        console.error('Error adding weight:', error);
        res.status(500).json({ error: 'Failed to add weight.' });
    }
});

router.get('/weightTrack', auth, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have middleware to extract user ID from token

        // Find the user's progress document
        const progress = await Progress.findOne({ user: userId }).populate('weightTrack');

        // Respond with weightTrack data
        res.json({ weightTrack: progress.weightTrack });
    } catch (error) {
        console.error('Error fetching weightTrack data:', error);
        res.status(500).json({ error: 'Failed to fetch weightTrack data.' });
    }
});

module.exports = router;
