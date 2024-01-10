// GoalsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, StyleSheet } from 'react-native';

const GoalsScreen = ({ navigation }) => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState(''); // Default to an empty string
  const [rate, setRate] = useState('');

  const calculateNutrition = () => {
    // Implement your calorie and macronutrient calculation logic here
    const calculatedCalories = calculateCalories(currentWeight, height, age, sex, rate);
    const { protein, carbs, fats } = calculateMacronutrientRatio(calculatedCalories, currentWeight);

    //can be changed to be foodJournalScreen
    navigation.navigate('WeightJournalScreen');
    // Display the calculated information or navigate to another screen to display it
    // alert(`calories: ${calculatedCalories}, Protein: ${protein}g, Carbs: ${carbs}g, Fats: ${fats}g`);
  };

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

  const handleLogout = () => {
    // Navigate to the LoginScreen when the logout button is pressed
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Weight kg</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current weight"
        keyboardType="numeric"
        onChangeText={(text) => setCurrentWeight(text)}
        value={currentWeight}
      />
      
      <Text style={styles.label}>Goal Weight kg</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter goal weight"
        keyboardType="numeric"
        onChangeText={(text) => setGoalWeight(text)}
        value={goalWeight}
      />
      
      <Text style={styles.label}>Height (in cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter height"
        keyboardType="numeric"
        onChangeText={(text) => setHeight(text)}
        value={height}
      />
      
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
        value={age}
      />
      
      <Text style={styles.label}>Sex</Text>
      <Picker
        style={styles.input}
        selectedValue={sex}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Select Sex" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>weight gain/loss rate goals</Text>
      <Picker
        style={styles.input}
        selectedValue={rate}
        onValueChange={(itemValue) => setRate(itemValue)}
      >
        <Picker.Item label="maintain weight" value="" />
        <Picker.Item label="lose 1kg per week" value="-1kg" />
        <Picker.Item label="lose 0.5kg per week" value="-0.5kg" />
        <Picker.Item label="gain 0.5kg per week" value="+0.5kg" />
        <Picker.Item label="gain 1kg per week" value="+1kg" />
      </Picker>
      
      <TouchableOpacity onPress={calculateNutrition}>
        <Text>Calculate Nutrition</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});

export default GoalsScreen;

