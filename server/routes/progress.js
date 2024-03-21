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

router.get('/lastFourWeeks', auth, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract user ID from token

    // Find the user's progress document
    const progress = await Progress.findOne({ user: userId }).populate('weightTrack');

    const weightTrack = progress.weightTrack;

    // Check if there are at least two entries
    if (weightTrack.length < 2) {
      return res.status(400).json({ error: 'Insufficient data for suggestions.' });
    }

    // Extract dates from weightTrack entries
    const dates = weightTrack.map(entry => new Date(entry.date));
    
    // Sort dates in ascending order
    dates.sort((a, b) => a - b);

    // Calculate time difference in days between first and last entry
    const timeDifferenceInDays = Math.ceil((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24));

    // Check if time difference is greater than or equal to 30 days
    if (timeDifferenceInDays >= 30) {
      // If time difference is sufficient, proceed with sending data
      const weightTrackPairs = weightTrack.map(({ date, weight }) => ({ date, weight }));
      res.json({ weightTrackPairs });
    } else {
      // If time difference is not sufficient, respond with an error
      return res.status(400).json({ error: 'Insufficient data for suggestions. Time difference is less than 30 days.' });
    }
  } catch (error) {
    console.error('Error fetching weightTrack data:', error);
    res.status(500).json({ error: 'Failed to fetch weightTrack data.' });
  }
});


module.exports = router;
