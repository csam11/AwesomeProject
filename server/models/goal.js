// Goal schema: defines the user's fitness objectives, including their current and target weight, as well as their chosen activity preferences and target caloric intake

const mongoose = require('mongoose');
const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentWeight: {
        type: Number,
        required: true
    },
    goalWeight: {
        type: Number,
        required: true
    },
    activityPreferences: [
        {
            type: String,
        }
    ],
    TargetCalories: {
        type: Number,
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;