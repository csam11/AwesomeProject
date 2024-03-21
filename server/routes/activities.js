const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const auth = require('../middleware/auth');


// POST /api/activities - Add a new activity
router.post('/', auth, async (req, res) => {
    try{
        const { type, duration, caloriesBurned, date } = req.body;
        const userId = req.user._id;

        const day = new Date(date).toDateString();

        const newActivity = new Activity({
            user: userId,
            type,
            duration,
            caloriesBurned,
            day,
            date,
        });

        await newActivity.save();
        console.log('Activity added successfully');
        res.status(201).json({ message: 'Activity added successfully', activity: newActivity });
    } catch (error) {
        console.error('Failed to add activity:', error);
        res.status(500).json({ message:'Error adding activity', error: error.message  });
    }
});

// GET /api/activities - Retrieve all activities
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const activities = await Activity.find({ user: userId });
        console.log('Retrieved activities:', activities); // log the activities to the console
        res.json(activities);
    } catch (error) {
        console.error('Failed to retrieve activities:', error);
        res.status(500).json({ message: 'Error retrieving activities', error: error.message });
    }
});

module.exports = router;