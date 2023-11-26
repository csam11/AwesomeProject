import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
      {/* Add your registration form components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegistrationScreen;
