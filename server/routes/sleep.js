const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sleep = require('../models/sleep');

// POST /api/goals/calculate - Create user goals
router.post('/addSleep', auth, async (req, res) => {
    try {
        const { sleep, date } = req.body; // Extract weight and date from request body
        const userId = req.user._id; // Assuming you have middleware to extract user ID from token
        
        // Create a new weight entry object
        const newSleepEntry = {
            sleep: parseFloat(sleep),
            date: date,
        };

        // Find the user's progress document and push the new weight entry
        const progress = await Sleep.findOneAndUpdate(
            { user: userId }, // Find progress document by user ID
            { $push: { sleepTrack: newSleepEntry } }, // Push the new weight entry
            { new: true, upsert: true } // Create progress document if not exists
        );

        // Respond with a success message or the updated progress data
        // console.log(progress);
        res.json({ progress });
    } catch (error) {
        console.error('Error adding sleep:', error);
        res.status(500).json({ error: 'Failed to add sleep.' });
    }
});

router.get('/sleepTrack', auth, async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have middleware to extract user ID from token

        // Find the user's progress document and populate the sleepTrack array
        const progress = await Sleep.findOne({ user: userId }).populate('sleepTrack');

        // Respond with sleepTrack data
        res.json({ sleepTrack: progress.sleepTrack });
    } catch (error) {
        console.error('Error fetching sleeptrack data:', error);
        res.status(500).json({ error: 'Failed to fetch sleepTrack data.' });
    }
});

router.post('/bedtime', auth, async (req, res) => {
    try {
        const { bedtime } = req.body; // Extract bedtime from request body
        const userId = req.user._id; // Assuming you have middleware to extract user ID from token
        
        // Update or create the user's progress document with the new bedtime
        const progress = await Sleep.findOneAndUpdate(
            { user: userId },
            { bedtime: bedtime },
            { upsert: true, new: true }
        );

        // Respond with the updated progress data
        BT = progress.bedtime
        res.json({ bedtime: progress.bedtime });
    } catch (error) {
        console.error('Error updating bedtime:', error);
        res.status(500).json({ error: 'Failed to update bedtime.' });
    }
});


module.exports = router;
