import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '/src/styles/inputStyles';

const FoodPicker = ({ selectedFood, onFoodChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Select Food:</Text>
    <TextInput
      value={selectedFood}
      onChangeText={onFoodChange}
      placeholder="Enter a food"
      style={styles.input}
    />
  </View>
);

export default FoodPicker;
