// Nutrition Schema: logging food and beverage intake. It includes the type of food, calories, and macronutrients, supporting the features implemented in the Journal.js file

const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }, 
},{
        timestamps: true
    });
    

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;