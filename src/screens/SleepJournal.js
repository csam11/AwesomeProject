import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SleepJournalScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [sleepIn, setSleep] = useState('');
  const [dateIn, setDate] = useState('');
  const [markedDates, setSleepData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [bedtime, setBedtime] = useState('');
  const [isBedtimeModalVisible, setBedtimeModalVisible] = useState(false);

  const handleBedtime = async () => {
    const newBedtimeEntry = {
      bedtime: bedtime
    };
    try {
      const response = await fetch('http://localhost:8080/api/sleep/bedtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newBedtimeEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to add sleep');
      }

      setBedtime('');
      setBedtimeModalVisible(false);
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error adding sleep:', error);
    }
  };


  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        fetchSleepData(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    retrieveToken();
  }, []);

  const fetchSleepData = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/sleep/sleepTrack', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sleep data');
      }

      const responseData = await response.json();

      const updatedMarkedDates = {};
      responseData.sleepTrack.forEach(entry => {
        const date = new Date(entry.date).toISOString().split('T')[0];
        updatedMarkedDates[date] = { marked: true, sleepHours: entry.sleep }; // Include sleep hours in marked dates
      });

      setSleepData(updatedMarkedDates);
      console.log("update:",updatedMarkedDates);
    } catch (error) {
      console.error('Error fetching sleep data:', error);
    }
  };
  
  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    if (markedDates[selectedDate] && markedDates[selectedDate].sleepHours !== undefined) {
      const sleepHours = markedDates[selectedDate].sleepHours;
      alert(`You slept ${sleepHours} hours on ${selectedDate}`);
    } else {
      alert(`There is no sleep data available for ${selectedDate}`);
    }
  };
  

  const handleSleep = async () => {
    const newSleepEntry = {
      sleep: sleepIn,
      date: dateIn,
    };
    try {
      const response = await fetch('http://localhost:8080/api/sleep/addSleep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(newSleepEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to add sleep');
      }

      setSleep('');
      setDate('');
      setModalVisible(false);
      fetchSleepData(token);
    } catch (error) {
      console.error('Error adding sleep:', error);
    }
  };

  const handleJournal = () => {
    navigation.navigate('Journal');
  };
  
  const handleExercise = () => {
    navigation.navigate('ExerciseJournal');
  };
  
  const handleWeigth = () => {
    navigation.navigate('WeightJournalScreen');
  };

  return (
    <View style={styles.container}>
      <Text>Sleep Journal Screen</Text>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={(day) => handleDayPress(day)}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Add Sleep</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setBedtimeModalVisible(true)}>
        <Text>Set Bedtime</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Sleep and Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Sleep (estimated hours)"
              keyboardType="numeric"
              onChangeText={(text) => setSleep(text)}
              value={sleepIn}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (e.g., 01/06)"
              onChangeText={(text) => setDate(text)}
              value={dateIn}
            />
            <TouchableOpacity onPress={handleSleep}>
              <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
      animationType="slide"
      transparent={true}
      visible={isBedtimeModalVisible}
      onRequestClose={() => setBedtimeModalVisible(false)}
      >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Set Bedtime</Text>
          <TextInput
            style={styles.input}
            placeholder="Bedtime (10:00 PM)"
            onChangeText={(text) => setBedtime(text)}
            value={bedtime}
          />
            <TouchableOpacity onPress={handleBedtime}>
              <Text>save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBedtimeModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleJournal}>
          <Text>Food Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('SleepJournal')}>
          <Text>Sleep Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={handleWeigth}>
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
  calendar: {
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

export default SleepJournalScreen;
