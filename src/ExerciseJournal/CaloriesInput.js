import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '/src/styles/inputStyles';

const CaloriesInput = ({ calories, onCaloriesChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Calories Burned:</Text>
    <TextInput
      keyboardType="numeric"
      value={calories}
      onChangeText={onCaloriesChange}
      placeholder="Enter calories burned"
      style={styles.input}
    />
  </View>
);



export default CaloriesInput;
