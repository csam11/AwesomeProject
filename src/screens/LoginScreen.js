// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {

  const [showPrompt, setShowPrompt] = useState(false)

  const apiCall = () => {
      axios.post('http://localhost:19006/api/users/login', {
          username: username,
          password: password,
      })
      .then(response => {
          console.log(response.data.message); // Log the response from the server
          navigation.navigate('WeightJournalScreen');
      })
      .catch(error => {
          setShowPrompt(true);
          setUsername('');
          setPassword('');
      });
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

      <Button title="Login" onPress={apiCall} />

      <Modal
        visible={showPrompt}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPrompt(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Login failed. Please enter correct username and password, or register for an account.</Text>
            <Button title="OK" onPress={() => setShowPrompt(false)} />
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
  },
});

export default LoginScreen;
