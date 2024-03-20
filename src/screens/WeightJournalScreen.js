import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightJournalScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [weightData, setWeightData] = useState([]);
  const [token, setToken] = useState('');
  const [goalWeight, setGoalWeight] = useState('');


  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

        // Fetch weight data when the component mounts
        fetchWeightData(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    fetchWeightData();
    retrieveToken();
  }, []);

  const fetchWeightData = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/progress/weightTrack', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weight data');
      }

      const responseData = await response.json();

      // Update weightData state with the retrieved data
      setWeightData(responseData.weightTrack);

      const goalRes = await fetch('http://localhost:8080/api/goals/weightGoalTrack', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!goalRes.ok) {
        throw new Error('Failed to fetch weight data');
      }

      const goalResData = await goalRes.json();

      // Update weightData state with the retrieved data
      setGoalWeight(goalResData.goalWeight);
      console.log(goalWeight)
    } catch (error) {
      console.error('Error retrieving goal weight data:', error);
    }
  };

  const addWeight = async () => {
    if (weight && date) {
      const newWeightEntry = {
        weight: parseFloat(weight),
        date: date,
      };

      try {
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

        // Update state with the new weight entry
        setWeight('');
        setDate('');
        setModalVisible(false);

        // Fetch weight data again after adding a new weight
        fetchWeightData(token);
      } catch (error) {
        console.error('Error adding weight:', error);
      }
    }
  };

// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month}`;
};

// Chart data configuration
const chartData = {
  labels: weightData.map((entry) => formatDate(entry.date)),
  datasets: [
    {
      data: weightData.map((entry) => entry.weight),
    },
    {
      data: Array(weightData.length).fill(goalWeight), // Fill the data array with the goal weight
      color: () => 'red', // Set color for the goal weight line
      strokeWidth: 2, // Set stroke width for the goal weight line
    },
  ],
};

  // Navigation functions
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
      <Text>Weight Journal Screen</Text>
      <LineChart
        data={chartData}
        width={600}
        height={400}
        yAxisSuffix="kg"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#eee',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Add Weight</Text>
      </TouchableOpacity>

      {/* Modal for adding weight */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal content */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Weight and Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight"
              keyboardType="numeric"
              onChangeText={(text) => setWeight(text)}
              value={weight}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (e.g., 01/06)"
              onChangeText={(text) => setDate(text)}
              value={date}
            />
            <TouchableOpacity onPress={addWeight}>
              <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom navigation */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleJournal}>
          <Text>Food Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleSleep}>
          <Text>Sleep Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text>Weight Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleExercise}>
          <Text>Exercise Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
  },
  bottomButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default WeightJournalScreen;
