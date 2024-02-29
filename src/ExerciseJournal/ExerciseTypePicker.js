import React from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import styles from '/src/styles/inputStyles';


const ExerciseTypePicker = ({ selectedExerciseType, onExerciseTypeChange, exerciseTypes }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Select Exercise Type:</Text>
    <Picker 
      selectedValue={selectedExerciseType}
      onValueChange={onExerciseTypeChange}
      style={styles.input}
    >
      <Picker.Item label="Select" value="" />
      {exerciseTypes.map((type, index) => (
        <Picker.Item key={index} label={type} value={type} />
      ))}
    </Picker>
  </View>
);

export default ExerciseTypePicker;





