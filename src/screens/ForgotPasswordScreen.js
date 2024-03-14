import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  
  const sendResetRequest = () => {
    axios.post('http://localhost:8080/forgot-password', { email })
      .then(response => {
        alert('Password reset email sent.');
      })
      .catch(error => {
        alert('Failed to send reset email. Please try again.');
      });
  };
  
  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Reset Email" onPress={sendResetRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: '80%',
  },
});

export default ForgotPasswordScreen;
