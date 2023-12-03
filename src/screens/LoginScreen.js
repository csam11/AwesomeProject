import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more users as needed
  ];

  const handleLogin = () => {
    const user = users.find((user) => user.username === username && user.password === password);
    errorMessage = 'Login Failed', 'Invalid username or password'
    if (user) {
      // Successful login, navigate to the GoalsScreen
      navigation.navigate('GoalsScreen');
    } else {
      // Handle authentication error
      alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Username?"
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
