import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '75%',
    height: 15,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
});

export default ProgressBar;
