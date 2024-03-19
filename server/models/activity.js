// Activity schema: tracks exercises or workouts, including the type, duration, and calories burned, which aligns with ExerciseJournal.js functionalities

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: { // in minutes
        type: Number,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        //required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;