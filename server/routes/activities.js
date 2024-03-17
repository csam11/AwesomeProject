const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const auth = require('../middleware/auth');


// POST /api/activities - Add a new activity
router.post('/', auth, async (req, res) => {
    try{
        const { type, duration, caloriesBurned, date } = req.body;
        const userId = req.user._id;

        const newActivity = new Activity({
            user: userId,
            type,
            duration,
            caloriesBurned,
            date
        });

        await newActivity.save();
        console.log('Activity added successfully');
        res.status(201).json({ message: 'Activity added successfully', activity: newActivity });
    } catch (error) {
        console.error('Failed to add activity:', error);
        res.status(500).json({ message:'Error adding activity', error: error.message  });
    }
});

module.exports = router;