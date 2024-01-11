import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeightJournalScreen = () => {
  const [weight, setWeight] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [weights, setWeights] = useState([65, 66, 64, 68, 67]); // Samples
  const [dates, setDates] = useState(['01/01', '01/02', '01/03', '01/04', '01/05']); // Samples

  const chartData = {
    labels: dates,
    datasets: [
      {
        data: weights,
      },
    ],
  };

  const addWeight = () => {
    if (weight) {
      setWeights((prevWeights) => [...prevWeights, parseFloat(weight)]);
      setWeight('');
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
            <Text>Enter Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight"
              keyboardType="numeric"
              onChangeText={(text) => setWeight(text)}
              value={weight}
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
