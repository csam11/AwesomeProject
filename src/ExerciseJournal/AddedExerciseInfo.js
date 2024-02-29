import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const AddedExerciseInfo = ({ addedExercise }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Recently Added Exercise:</Text>
    <Text style={styles.info}>Exercise Type: {addedExercise.type}</Text>
    <Text style={styles.info}>Exercise: {addedExercise.exercise}</Text>
    <Text style={styles.info}>Calories Burned: {addedExercise.calories}</Text>
    <Text style={styles.info}>Duration: {addedExercise.duration} minutes</Text>
    <Text style={styles.info}>Day: {addedExercise.day}</Text>
  </View>
);

export default AddedExerciseInfo;