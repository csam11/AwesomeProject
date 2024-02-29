import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import styles from '/src/styles/inputStyles';

const DayPicker = ({ selectedDay, onDayChange, daysOfWeek }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Select Day:</Text>
    <Picker selectedValue={selectedDay} onValueChange={onDayChange} style={styles.input}>
      <Picker.Item label="Select" value="" />
      {daysOfWeek.map((day, index) => (
        <Picker.Item key={index} label={day} value={day} />
      ))}
    </Picker>
  </View>
);

export default DayPicker;
