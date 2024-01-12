import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeightJournalScreen = () => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [weightData, setWeightData] = useState([
    { weight: 65, date: '01/01' },
    { weight: 66, date: '01/02' },
    { weight: 64, date: '01/03' },
    { weight: 68, date: '01/04' },
    { weight: 67, date: '01/05' },
  ]); // Samples

  const chartData = {
    labels: weightData.map((entry) => entry.date),
    datasets: [
      {
        data: weightData.map((entry) => entry.weight),
      },
    ],
  };

  const addWeight = () => {
    if (weight && date) {
      const newWeightEntry = {
        weight: parseFloat(weight),
        date: date,
      };

      setWeightData((prevData) => [...prevData, newWeightEntry]);
      setWeight('');
      setDate('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Weight Journal Screen</Text>
      <LineChart
        data={chartData}
        width={300}
        height={200}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
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
});

export default WeightJournalScreen;
