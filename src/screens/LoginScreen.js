// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hardcoded username and password for testing purposes
  const correctUsername = 'testuser';
  const correctPassword = 'testpassword';

  const handleLogin = () => {
    if (username == correctUsername && password == correctPassword) {
      console.log('Login successful');
      navigation.navigate('WeightJournalScreen');
    } else {
      alert('Login failed Invalid username or password');
      setUsername('')
      setPassword('')
    }
  };  

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Login" onPress={handleLogin} />
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
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: '80%',
  },
});

export default LoginScreen;
