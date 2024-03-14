// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email address
    return emailRegex.test(email);
  };

const handleSubmit = () => {
  console.log('Submit button pressed with email: ', email); // debug
  if (!validateEmail(email)) {
    setEmailError('Invalid email address');
    return;
  };

  // reset email error
  setEmailError('');

  // TODO: Implement API call for password reset here


  window.alert('If an account exists for this email, a password reset link will be sent.');

  Alert.alert(
    'Password Reset',
    'If an account exists for this email, a password reset link will be sent.',
    [{ text: 'OK' }],
  );
};


  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
