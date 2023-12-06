import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Animated, TouchableOpacity, Picker, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';

const JournalScreen = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedOption, setSelectedValue] = useState('');
  const options = ['Snacks', 'Morning', 'Afternoon', 'Evening'];
  const [goal, setGoal] = useState(2568);
  const [currentValue, setCurrentValue] = useState(567);
  const [progress, setProgress] = useState((currentValue / goal) * 100);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState({
    morning: [],
    afternoon: [],
    night: [],
  });

  const foodOptions = [
    { name: 'Eggs', calories: 70 },
    { name: 'Bacon', calories: 120 },
    { name: 'Toast', calories: 80 },
    { name: 'Salad', calories: 50 },
    { name: 'Burger', calories: 300 },
    { name: 'Pasta', calories: 250 },
    // Add more food items as needed
  ];

  const handleSelectChange = (value) => {
    setSelectedFood(value);

    if (value !== '') {
      const foodObj = foodOptions.find((food) => food.name === value);
      if (foodObj) {
        const updatedSelectedTime = { ...selectedTime };
        updatedSelectedTime[selectedTimeOfDay].push({
          name: value,
          calories: foodObj.calories,
        });
        setSelectedTime(updatedSelectedTime);
      }
    }
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const calculateTotalCalories = (time) => {
    if (selectedTime && selectedTime[time]) {
      return selectedTime[time].reduce((totalCalories, food) => {
        return totalCalories + food.calories;
      }, 0);
    }
    return 0;
  };

  const filteredFoodOptions = foodOptions.filter((food) =>
    typeof searchTerm === 'string' && food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCaloriesToPeriod = () => {
    if (selectedFood !== '' && selectedTimeOfDay !== '') {
      const foodObj = foodOptions.find((food) => food.name === selectedFood);
      if (foodObj) {
        const updatedSelectedTime = { ...selectedTime };
        updatedSelectedTime[selectedTimeOfDay].push({
          name: selectedFood,
          calories: foodObj.calories,
        });
        setSelectedTime(updatedSelectedTime);
        setSelectedFood(''); // Clear the selected food after adding
      }
    }
  };

  const addCaloriesToCurrentValue = () => {
    if (selectedFood !== '') {
      const foodObj = foodOptions.find((food) => food.name === selectedFood);
      if (foodObj) {
        const updatedCurrentValue = currentValue + foodObj.calories;
        setCurrentValue(updatedCurrentValue);
        setSelectedFood(''); // Clear the selected food after adding
      }
    }
  };

  const handleAdd = () => {
    // Wrapper function calling both functions
    addCaloriesToPeriod();
    addCaloriesToCurrentValue();
  };
  const calculateAllTotalCalories = () => {
    const allCalories = Object.values(selectedTime)
      .flat()
      .reduce((totalCalories, food) => {
        return totalCalories + food.calories;
      }, 0);
    return allCalories;
  };

  // ProgressBar component
  const ProgressBar = ({ progress }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]}>
          {/* Remove the nested View with width styling */}
        </View>
      </View>
    );
  };

    // Function to update progress bar
    const updateProgressBar = () => {
        const calculatedProgress = (currentValue / goal) * 100;
        setProgress(calculatedProgress);
      };


  const calculateExactDate = () => {
    const current = new Date();
    setCurrentDay(current.toLocaleDateString());
    setCurrentTime(current.toLocaleTimeString());
  };

  useEffect(() => {
    calculateExactDate();
    updateProgressBar();
  }, [currentValue, goal]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

// ...

const renderLineChart = () => {
    // Calculate total calories for different times of the day
    const caloriesPerTimeOfDay = [
      calculateTotalCalories('morning'),
      calculateTotalCalories('afternoon'),
      calculateTotalCalories('night'),
      // Add more time of day calculations as needed
    ];
  
    const timeOfDayLabels = ['Morning', 'Afternoon', 'Night']; // Labels for different times of the day
  
    const lineChartData = {
      labels: timeOfDayLabels,
      datasets: [
        {
          data: caloriesPerTimeOfDay,
        },
      ],
    };
  
    const lineChartConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };
  
    return (
      <LineChart
        data={lineChartData}
        width={1200}
        height={400}
        yAxisSuffix=" kCal"
        chartConfig={lineChartConfig}
        bezier
        style={{ borderRadius: 5 }}
      />
    );
  };
  
  // ...
  
  
    const renderPieChart = () => {
            // Calculate calories consumed per time of day
    const caloriesPerTimeOfDay = {
        Morning: calculateTotalCalories('morning'),
        Afternoon: calculateTotalCalories('afternoon'),
        Night: calculateTotalCalories('night'),
      };

        const colors = ['#FF6347', '#FFD700', '#7FFF00']; // Predefined distinct colors for morning, afternoon, and night
      
        const pieChartData = Object.keys(caloriesPerTimeOfDay).map((timeOfDay, index) => ({
          name: timeOfDay,
          population: caloriesPerTimeOfDay[timeOfDay],
          color: colors[index] || '#000000', // Assign colors based on index or use a default color
          legendFontColor: '#7F7F7F',
          legendFontSize: 15 + index * 3, // Adjust the legend font size
        }));
      
        return (
          <View style={{}}>
            <PieChart
              data={pieChartData}
              width={650}
              height={400}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        );
      };
      

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleBig}>Weight Loss Journal</Text>
        <Text style={styles.title}>{currentDay} - {currentTime}</Text>
        <ProgressBar progress={progress} />
          <Text>
            Progress: {currentValue}/{goal} Calories
          </Text>
      </View>
      <View style={styles.bigRectangle}>
        {renderLineChart()}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.square}>
          <View style={styles.pieChartContainer}>
            {renderPieChart()} {/* Render the pie chart */}
          </View>
        </View>
        <View style={styles.square}>
        <View style={styles.container}>
      <Text>Select Time of Day:</Text>
      <Picker
        selectedValue={selectedTimeOfDay}
        onValueChange={(itemValue) => setSelectedTimeOfDay(itemValue)}
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Morning" value="morning" />
        <Picker.Item label="Afternoon" value="afternoon" />
        <Picker.Item label="Night" value="night" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Search food..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />

      <Picker
        selectedValue={selectedFood}
        onValueChange={(itemValue) => setSelectedFood(itemValue)}
      >
        <Picker.Item label="Select Food" value="" />
        {filteredFoodOptions.map((food, index) => (
          <Picker.Item key={index} label={food.name} value={food.name} />
        ))}
      </Picker>
            <Button title="Add" onPress={handleAdd} />
      <View>
        <Text>Total Calories for {selectedTimeOfDay}</Text>
        <Text>{calculateTotalCalories(selectedTimeOfDay)}</Text>
      </View>
    </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here to search..."
        />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
    // ... (existing styles)
  
    bigRectangle: {
      width: '100%',
      height: 400, // Height of the big rectangle
      backgroundColor: 'lightgray', // Example background color
      marginBottom: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      border: '5px solid lightblue',
      // Other styles for the big rectangle
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    square: {
      flex: 1,
      aspectRatio: 1, // Maintain a 1:1 aspect ratio
      backgroundColor: 'lightgray', // Example background color
      marginRight: 10,
      height: 400,
      // Other styles for the squares
    },
    pieChartContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      border: '5px solid lightblue',

      // Styles for the container of the pie chart
      // Adjust styles as needed
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        border: '3px solid lightblue',

    },
    progressBarContainer: {
        width: '75%',
        height: 15,
        backgroundColor: '#ccc',
        borderRadius: 10,
        marginTop: 20,
        
      },
      progressBar: {
        height: '100%',
        backgroundColor: 'green', // Adjust the color as needed
        borderRadius: 10,
      },

  });
  
  
export default JournalScreen;
