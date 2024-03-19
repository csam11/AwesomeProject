// Goal schema: defines the user's fitness objectives, including their current and target weight, as well as their chosen activity preferences and target caloric intake

const mongoose = require('mongoose');
const goalSchema = new mongoose.Schema({
    currentWeight: {
        type: Number,
        required: true
    },
    goalWeight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    weightRate: {
        type: String,
        required: true
    },
    targetCalories: {
        type: Number,
    },
    targetProtein: {
        type: Number,
    },
    targetFat: {
        type: Number,
    },
    targetCarb: {
        type: Number,
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;