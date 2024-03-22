import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodNutritionInfo = ({ food }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nutritional Information for {food.name} (per 100g):</Text>
      <Text>Calories: {food.calories}</Text>
      <Text>Fat: {food.fat}g</Text>
      <Text>Carbohydrates: {food.carbs}g</Text>
      <Text>Protein: {food.protein}g</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default FoodNutritionInfo;
