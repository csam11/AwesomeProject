import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook


const WeightJournalScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [weightData, setWeightData] = useState([]);
  const [token, setToken] = useState('');
  const [goalWeight, setGoalWeight] = useState('');

    // Fetch weight data when the screen comes into focus
    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          await fetchWeightData(token);
        };
        fetchData();
  
        // Clean up function
        return () => {
          // You can perform any cleanup here if needed
        };
      }, [token]) // Re-run effect when token changes
    );


  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

        // Fetch weight data when the component mounts
        // fetchWeightData(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    retrieveToken();
  }, []);

  function maintainCalculation(data,GW) {
    const averageWeight = data.reduce((acc, curr) => acc + curr, 0) / data.length;
    console.log(data[0], averageWeight, GW);

    let suggestion = "you're doing great keep it up!";
    
    if (averageWeight <= GW-1.5 && (averageWeight <= data[0]-1.5)) {
        suggestion = "based on the data provided we reccomend a +1000 increase to calories";
    } else if (averageWeight >= GW+1.5 && (averageWeight >= data[0]+1.5)) {
        suggestion = "based on the data provided we reccomend a -1000 increase to calories";
    } else if (averageWeight <= GW-0.75 && (averageWeight <= data[0]-0.75)) {
      suggestion = "based on the data provided we reccomend a +500 increase to calories";
    } else if (averageWeight >= GW+0.75 && (averageWeight >= data[0]+0.75)) {
      suggestion = "based on the data provided we reccomend a +500 increase to calories";
    }
    
    console.log(suggestion);
    alert(suggestion);
  }

  function gain1kgCalculation(data,GW) {
    const averageWeight = data.reduce((acc, curr) => acc + curr, 0) / data.length;
    console.log(data[0], averageWeight, GW);

    let suggestion = "you're doing great keep it up!";
    
    if (averageWeight < GW-1.5 && (averageWeight <= data[0])) {
      suggestion = "based on the data provided we reccomend a +1000 increase to calories";
    } else if (averageWeight < GW-0.75 && (averageWeight <= data[0]+0.75)) {
      suggestion = "+based on the data provided we reccomend a +500 increase to calories";
    } 
    
    console.log(suggestion);
    alert(suggestion);
  }

  function gain05kgCalculation(data,GW) {
    const averageWeight = data.reduce((acc, curr) => acc + curr, 0) / data.length;
    console.log(data[0], averageWeight, GW);

    let suggestion = "you're doing great keep it up!";
    
    if (averageWeight < GW-1.5 && (averageWeight <= data[0]-0.75)) {
      suggestion = "based on the data provided we reccomend a +1000 increase to calories";
    } else if (averageWeight < GW-0.75 && (averageWeight <= data[0])) {
      suggestion = "based on the data provided we reccomend a +500 increase to calories";
    } 
    
    console.log(suggestion);
    alert(suggestion);
  }
  //inputs are weight data array and goal weight
  function lose1kgCalculation(data,GW) {
    const averageWeight = data.reduce((acc, curr) => acc + curr, 0) / data.length;
    console.log(data[0], averageWeight, GW);

    let suggestion = "you're doing great keep it up!";
    
    if (averageWeight > GW-1.5 && (averageWeight >= data[0])) {
      suggestion = "based on the data provided we reccomend a -1000 decrease to calories";
    } else if (averageWeight > GW-0.75 && (averageWeight >= data[0]-0.75)) {
      suggestion = "based on the data provided we reccomend a -500 decrease to calories";
    } 
    
    console.log(suggestion);
    alert(suggestion);
  }

  function lose05kgCalculation(data,GW) {
    const averageWeight = data.reduce((acc, curr) => acc + curr, 0) / data.length;
    console.log(data[0], averageWeight, GW);

    let suggestion = "you're doing great keep it up!";
    
    if (averageWeight > GW-1.5 && (averageWeight >= data[0]+0.75)) {
      suggestion = "based on the data provided we reccomend a -1000 decrease to calories";
    } else if (averageWeight > GW-0.75 && (averageWeight >= data[0])) {
      suggestion = "based on the data provided we reccomend a -500 decrease to calories";
    } 
    
    console.log(suggestion);
    alert(suggestion);
  }

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
      console.log("goal weight:",goalResData.goalWeight)

      const weightRate = await fetch('http://localhost:8080/api/goals/weightRate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      const weightRateData = await weightRate.json();
      const weightRateExtract = weightRateData.weightRate; // Extract the weight rate from the response object
      // console.log(weightRateExtract)
      let weightRateValue;

      //set the weightrate value for use in functions
      if (weightRateExtract === "0kg") {
        weightRateValue = 0;
      } else if (weightRateExtract === "+1kg") {
        weightRateValue = 1;
      } else if (weightRateExtract === "+0.5kg") {
        weightRateValue = 0.5;
      } else if (weightRateExtract === "-1kg") {
        weightRateValue = -1;
      } else if (weightRateExtract === "-0.5kg") {
        weightRateValue = -0.5;
      } else {
        // If weightRateData doesn't match any of the expected values
        // handle this case accordingly, for example:
        console.log("Unknown weight rate:", weightRateExtract, weightRateValue);
      }
      console.log("weight rate:", weightRateExtract, weightRateValue);
      
      // Now, you can use the weightRateValue variable as needed
      // For example, you can pass it to a function or use it in calculations
      

      const fourWeeks = await fetch('http://localhost:8080/api/progress/lastFourWeeks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!fourWeeks.ok) {
        throw new Error('Failed to fetch weight data');
      }

      const fourWeeksData = await fourWeeks.json();

      console.log("4 week data:",fourWeeksData);
      const weightValues = fourWeeksData.weightTrackPairs.map(pair => pair.weight);
      // console.log("justweight",weightValues);
      
      //calculate the suggestions based on inputs from last 4 weeks 
      if(weightRateValue == 0){
      maintainCalculation(weightValues,goalResData.goalWeight);
      console.log("maintain function")
      } else
      if(weightRateValue == 1){
        gain1kgCalculation(weightValues,goalResData.goalWeight);
        console.log("gain 1kg function")
      } else
      if(weightRateValue== -1){
        lose1kgCalculation(weightValues,goalResData.goalWeight)
        console.log("lose 1kg function")
      } else
      if(weightRateValue == 0.5){
        gain05kgCalculation(weightValues,goalResData.goalWeight);
        console.log("gain 0.5kg function")
      } else
      if(weightRateValue== -0.5){
        lose05kgCalculation(weightValues,goalResData.goalWeight)
        console.log("lose 0.5kg function")
      }
      
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

  const handleGoals = () => {
    navigation.navigate('AdjustGoalsScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.adjustButton} onPress={handleGoals}>
        <Text>Adjust Goals</Text>
      </TouchableOpacity>
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
  adjustButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default WeightJournalScreen;
