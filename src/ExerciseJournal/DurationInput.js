import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '/src/styles/inputStyles';

const DurationInput = ({ duration, onDurationChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Duration (in minutes):</Text>
    <TextInput
      keyboardType="numeric"
      value={duration}
      onChangeText={onDurationChange}
      placeholder="Enter duration"
      style={styles.input}
    />
  </View>
);

export default DurationInput;
