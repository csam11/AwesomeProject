// RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 13;
  };

  const handleRegistration = async () => {
    let errorMessage = '';
  
    if (!username) {
      errorMessage += 'Username is required. ';
    }
  
    if (!isEmailValid(email)) {
      errorMessage += 'Invalid email address. ';
    }
  
    if (!isPasswordValid(password)) {
      errorMessage += 'Password must be at least 13 characters long.';
    }
  
    if (errorMessage) {
      // Display a consolidated error message if there are validation errors
      alert(errorMessage);
    } else {
      // Email and password are valid, implement your registration logic here
      fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
      .then(async (response) => {
        if (response.status === 200) {  
          const data = await response.json();
          const token = data.token;
      
          console.log('Token generated:', token);
          await AsyncStorage.setItem('token', token);
      
          // Navigate to the next screen
          navigation.navigate('GoalsScreen');
        } else {
          // Handle error here
          alert('Registration failed, account may already exist');
          throw new Error('Registration failed');
        }
      })
      .catch((error) => console.error(error));
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Registration Screen</Text>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity onPress={handleRegistration}>
        <Text>Register</Text>
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default RegistrationScreen;
