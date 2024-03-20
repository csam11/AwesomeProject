const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/goal');

// POST /api/goals/calculate - Create user goals
router.post('/calculate', auth, async (req, res) => {
    try {
        const user = req.user._id;
        const { currentWeight, goalWeight, height, age, sex, weightRate } = req.body;
        // Calculate total calories based on the provided information
        const targetCalories = calculateCalories(currentWeight, height, age, sex, weightRate);
        const { protein, carbs, fats } = calculateMacronutrientRatio(targetCalories, currentWeight);

        const newGoal = new Goal({
            user,
            currentWeight,
            goalWeight,
            height,
            age,
            sex,
            weightRate,
            targetCalories,
            targetProtein: protein, // Corrected property name
            targetFat: fats, // Corrected property name
            targetCarb: carbs // Corrected property name
        });
        await newGoal.save();

        // Respond with a success message or the saved goal data
        res.json({ message: "saving successful" });
    } catch (error) {
        console.error('Failed to create goals:', error);
        res.status(500).json({ error: 'Failed to create goals' });
    }
});

router.get('/weightGoalTrack', auth, async (req, res) => {
  try {
      const userId = req.user._id; // Assuming you have middleware to extract user ID from token

      // Find the user's progress document
      const goal = await Goal.findOne({ user: userId }).populate('goalWeight');

      // Respond with weightTrack data
      res.json({ goalWeight: goal.goalWeight });
  } catch (error) {
      console.error('Error fetching goalWeight data:', error);
      res.status(500).json({ error: 'Failed to fetch goalWeight data.' });
  }
});

// Function to calculate total calories
const calculateCalories = (currentWeight, height, age, sex, rate) => {
    // Replace this with your own calorie calculation logic
    const bmr = sex === 'male'
      ? 88.362 + (13.397 * currentWeight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * currentWeight) + (3.098 * height) - (4.330 * age);

    var totalCalories = bmr * 1.2; // Assuming a sedentary lifestyle

    if (rate == "-1kg"){
      totalCalories -= 1000
    } 
    if (rate == "-0.5kg"){
      totalCalories -= 500
    } 
    if (rate == "+0.5kg"){
      totalCalories += 500
    } 
    if (rate == "+1kg"){
      totalCalories += 1000
    } 

    return totalCalories;
};

const calculateMacronutrientRatio = (calories, currentWeight) => {
    // Set protein intake based on current weight, allocate the rest to carbs and fats
    const proteinPerKg = 2.2; // Adjust this value based on your protein intake recommendation
    const protein = proteinPerKg * currentWeight;
    
    // Calculate remaining calories after allocating protein
    const remainingCalories = calories - (protein * 4); // 4 calories per gram of protein

    // Allocate 50% to carbs and 30% to fats (adjust ratios based on your recommendation)
    const carbs = remainingCalories * 0.6 / 4; // 4 calories per gram of carbs
    const fats = remainingCalories * 0.4 / 9; // 9 calories per gram of fat

    return { protein, carbs, fats };
};

module.exports = router;
