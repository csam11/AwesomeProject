import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalsScreen = ({ navigation }) => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [rate, setRate] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token'); // Use 'token' instead of 'x-auth-token'
        setToken(storedToken);
        console.log('Retrieved token from AsyncStorage:', storedToken);

      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
  
    retrieveToken();
  }, []);

  console.log('Retrieved token from AsyncStorage:', token);

  
  const handleGoalCreation = async () => {
      const newWeightEntry = {
      weight: currentWeight,
      };
      // Your payload data
      const payload = {
        currentWeight: currentWeight,
        goalWeight: goalWeight,
        height: height,
        age: age,
        sex: sex,
        weightRate: rate
      };
  
      // Make the POST request with token in headers
      fetch('http://localhost:8080/api/goals/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Include the token in the headers
        },
        body: JSON.stringify(payload),
      })
      .then(async (response) => {
          const data = await response.json();
          alert(data.message);
          // Navigate to next screen
          navigation.navigate('WeightJournalScreen');
      })
      .catch((error) => console.error(error));
      // Check the response status
      const response = await fetch('http://localhost:8080/api/progress/addWeight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newWeightEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to add weight');
      }
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Weight kg</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter current weight"
        keyboardType="numeric"
        onChangeText={(text) => setCurrentWeight(text)}
        value={currentWeight}
      />
      
      <Text style={styles.label}>Goal Weight kg</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter goal weight"
        keyboardType="numeric"
        onChangeText={(text) => setGoalWeight(text)}
        value={goalWeight}
      />
      
      <Text style={styles.label}>Height (in cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter height"
        keyboardType="numeric"
        onChangeText={(text) => setHeight(text)}
        value={height}
      />
      
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
        value={age}
      />
      
      <Text style={styles.label}>Sex</Text>
      <Picker
        style={styles.input}
        selectedValue={sex}
        onValueChange={(itemValue) => setSex(itemValue)}
      >
        <Picker.Item label="Select Sex" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>Weight gain/loss rate goals</Text>
      <Picker
        style={styles.input}
        selectedValue={rate}
        onValueChange={(itemValue) => setRate(itemValue)}
      >
        <Picker.Item label="Maintain weight" value="" />
        <Picker.Item label="Lose 1kg per week" value="-1kg" />
        <Picker.Item label="Lose 0.5kg per week" value="-0.5kg" />
        <Picker.Item label="Gain 0.5kg per week" value="+0.5kg" />
        <Picker.Item label="Gain 1kg per week" value="+1kg" />
      </Picker>
      
      <TouchableOpacity onPress={handleGoalCreation}>
        <Text>Calculate Nutrition</Text>
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
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});

export default GoalsScreen;
