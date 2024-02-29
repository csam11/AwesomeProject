import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '/src/styles/inputStyles';

const ExercisePicker = ({ selectedExercise, onExerciseChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Select Exercise:</Text>
    <TextInput
      value={selectedExercise}
      onChangeText={onExerciseChange}
      placeholder="Enter an exercise"
      style={styles.input}
    />
  </View>
);

export default ExercisePicker;
