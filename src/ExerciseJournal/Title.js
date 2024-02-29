import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

const Title = ({ currentDay, currentTime, progress, currentValue, goal }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleBig}>Exercise Journal</Text>
    <Text style={styles.title}>
      {currentDay} - {currentTime}
    </Text>
    <ProgressBar progress={progress} />
    <Text>
      Progress: {currentValue}/{goal} Calories Burned
    </Text>
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid lightblue',
  },
  // other styles...
});

export default Title;