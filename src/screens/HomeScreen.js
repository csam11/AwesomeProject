import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleCreateAccount = () => {
    navigation.navigate('Registration');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleJournal = () => {
    navigation.navigate('Journal');
  };

  const handleExercise = () => {
    navigation.navigate('ExerciseJournal');
  };

  const handleSleep = () => {
    navigation.navigate('SleepJournal');
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Simple Fitness</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleJournal}>
        <Text>Journal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleExercise}>
        <Text>Exercise Journal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSleep}>
        <Text>Sleep Journal</Text>
      </TouchableOpacity>
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

export default HomeScreen;
