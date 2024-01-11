import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Animated, TouchableOpacity, Picker, Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';

const AddedFoodInfo = ({ addedFood }) => {
  return (
    <View>
      <Text>Recently Added Food:</Text>
      <Text>Name: {addedFood.name}</Text>
      <Text>Calories: {addedFood.calories}</Text>
      <Text>Fat: {addedFood.fat}g</Text>
      <Text>Carbs: {addedFood.carbs}g</Text>
      <Text>Quantity: {addedFood.quantity}</Text>
    </View>
  );
};

const JournalScreen = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedOption, setSelectedValue] = useState('');
  const options = ['Snacks', 'Morning', 'Afternoon', 'Evening'];
  const [goal, setGoal] = useState(2568);
  const [currentValue, setCurrentValue] = useState(0);
  const [progress, setProgress] = useState((currentValue / goal) * 100);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState({
    morning: [],
    afternoon: [],
    night: [],
  });
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [quantity, setQuantity] = useState('1'); 
  const [recentlyAddedFood, setRecentlyAddedFood] = useState(null);




  const foodOptions = [
    { name: 'Eggs', calories: 70, fat: 5, carbs: 1 },
    { name: 'Bacon', calories: 120, fat: 10, carbs: 0 },
    { name: 'Toast', calories: 80, fat: 2, carbs: 15 },
    { name: 'Salad', calories: 160, fat: 3, carbs: 10 },
    { name: 'Burger', calories: 800, fat: 20, carbs: 25 },
    { name: 'Pasta', calories: 750, fat: 5, carbs: 45 },
    //more foods later
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
      const quantityValue = parseInt(quantity, 10) || 1; //make sure the quantity is an integer for food
  
      if (foodObj) {
        const updatedSelectedTime = { ...selectedTime };
        const foodItem = {
          name: selectedFood,
          calories: foodObj.calories * quantityValue,
          fat: foodObj.fat * quantityValue,
          carbs: foodObj.carbs * quantityValue,
          quantity: quantityValue,
        };
  
        updatedSelectedTime[selectedTimeOfDay].push(foodItem);
        setSelectedTime(updatedSelectedTime);
  
        //update total fat and carbs
        const updatedTotalFat = totalFat + foodObj.fat * quantityValue;
        const updatedTotalCarbs = totalCarbs + foodObj.carbs * quantityValue;
        setTotalFat(updatedTotalFat);
        setTotalCarbs(updatedTotalCarbs);
  
        setSelectedFood(''); 
        setQuantity('1'); 
        
        setRecentlyAddedFood(foodItem);
      }
    }
  };
  

  const addCaloriesToCurrentValue = () => {
    if (selectedFood !== '') {
      const foodObj = foodOptions.find((food) => food.name === selectedFood);
      if (foodObj) {
        const updatedCurrentValue = currentValue + foodObj.calories;
        setCurrentValue(updatedCurrentValue);
        setSelectedFood(''); //clear the food value once selected and submitted
      }
    }
  };

  const handleAdd = () => {
    //
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

  //progressBar
  const ProgressBar = ({ progress }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]}>
        </View>
      </View>
    );
  };

    //function used in conjunction with the progress bar 
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
    //calculate the total calories for each given time of day
    const caloriesPerTimeOfDay = [
      calculateTotalCalories('morning'),
      calculateTotalCalories('afternoon'),
      calculateTotalCalories('night'),
    ];
  
    const timeOfDayLabels = ['Morning', 'Afternoon', 'Night']; //the different time of days
  
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
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, 
      
    };
  
    return (
      <BarChart
        data={lineChartData}
        width={1200}
        height={400}
        yAxisSuffix=" kCal"
        chartConfig={lineChartConfig}
        bezier
        style={{ 
          borderRadius: 0 }}
      />
    );
  };
  //this function is used to populate the quantity drop down for the user input
    const renderQuantityPickerItems = () => {
      const quantityOptions = [1, 2, 3, 4, 5]; 
      return quantityOptions.map((value, index) => (
        <Picker.Item key={index} label={value.toString()} value={value.toString()} />
      ));
    };
  
    //function used to render a pie chart relative to the nutrient type
    const renderPieChart = (nutrientType) => {
      const nutrientPerTimeOfDay = {
        Morning: calculateTotalNutrient('morning', nutrientType),
        Afternoon: calculateTotalNutrient('afternoon', nutrientType),
        Night: calculateTotalNutrient('night', nutrientType),
      };
  
      const colors = ['#FF6347', '#FFD700', '#7FFF00'];
  
      const pieChartData = Object.keys(nutrientPerTimeOfDay).map((timeOfDay, index) => ({
        name: timeOfDay,
        population: nutrientPerTimeOfDay[timeOfDay],
        color: colors[index] || '#000000',
        legendFontColor: '#7F7F7F',
        legendFontSize: 9,
      }));
  
      return (
        <View style={{ marginBottom: 20 }}>
          <Text>{nutrientType === 'calories' ? 'Calories' : nutrientType}</Text>
          <PieChart
            data={pieChartData}
            width={250}
            height={100}
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
  //calculate the nutrients of the given food from the given time
    const calculateTotalNutrient = (time, nutrientType) => {
      if (selectedTime && selectedTime[time]) {
        return selectedTime[time].reduce((totalNutrient, food) => {
          return totalNutrient + food[nutrientType];
        }, 0);
      }
      return 0;
    };

    const handleRemoveFood = (timeOfDay, index) => {
      const updatedSelectedTime = { ...selectedTime };
      const removedFood = updatedSelectedTime[timeOfDay].splice(index, 1)[0];
      
      //update total fat and carbs relative to the time of day, this will also extend more nutrientations
      const updatedTotalFat = totalFat - removedFood.fat;
      const updatedTotalCarbs = totalCarbs - removedFood.carbs;
      setTotalFat(updatedTotalFat);
      setTotalCarbs(updatedTotalCarbs);
    
      setSelectedTime(updatedSelectedTime);
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
        <View styles={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
        {recentlyAddedFood && (
            <AddedFoodInfo addedFood={recentlyAddedFood} />
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.square}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 25, justifyContent: 'center' }}>
          {renderPieChart('calories')}
          {renderPieChart('fat')} 
          {renderPieChart('carbs')} 
          </View>
        </View>
        <View style={styles.square}>
        <View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 25, justifyContent: 'center' }}>
        <Text>Select Time of Day:</Text>
        <View style={{ marginBottom: 0 }}>
          <Picker
            selectedValue={selectedTimeOfDay}
            onValueChange={(itemValue) => setSelectedTimeOfDay(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Morning" value="morning" />
            <Picker.Item label="Afternoon" value="afternoon" />
            <Picker.Item label="Night" value="night" />
          </Picker>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Search food:"
            value={searchTerm}
            onChangeText={handleSearchChange}
          />
        </View>
        <View>
          <Picker
            selectedValue={selectedFood}
            onValueChange={(itemValue) => setSelectedFood(itemValue)}
          >
            <Picker.Item label="Select Food" value="" />
            {filteredFoodOptions.map((food, index) => (
              <Picker.Item key={index} label={food.name} value={food.name} />
            ))}
          </Picker>
        </View>
        <View>
            
          <Picker
              selectedValue={quantity}
              onValueChange={(itemValue) => setQuantity(itemValue)}
            >
              {renderQuantityPickerItems()}
          </Picker>

        </View>
          <Button title="Add" onPress={handleAdd} />

      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.infoContainer}>
          <Text>Morning</Text>
          <Text>Total Calories: {calculateTotalCalories('morning')}</Text>
          <Text>Total Fat: {selectedTime.morning.reduce((total, food) => total + food.fat, 0)}g</Text>
          <Text>Total Carbs: {selectedTime.morning.reduce((total, food) => total + food.carbs, 0)}g</Text>
          <View>
          {selectedTime.morning.map((food, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveFood('morning', index)}>
          <Text>{food.name} - {food.quantity}</Text>
          </TouchableOpacity>
          ))}
          </View>
          </View>
          <View style={styles.infoContainer}>
          <Text>Afternoon</Text>
          <Text>Total Calories: {calculateTotalCalories('afternoon')}</Text>
          <Text>Total Fat: {selectedTime.afternoon.reduce((total, food) => total + food.fat, 0)}g</Text>
          <Text>Total Carbs: {selectedTime.afternoon.reduce((total, food) => total + food.carbs, 0)}g</Text>
          <View>
          {selectedTime.afternoon.map((food, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveFood('afternoon', index)}>
          <Text>{food.name} - {food.quantity}</Text>
          </TouchableOpacity>
          ))}
          </View>
          </View>
          <View style={styles.infoContainer}>
          <Text>Night</Text>
          <Text>Total Calories: {calculateTotalCalories('night')}</Text>
          <Text>Total Fat: {selectedTime.night.reduce((total, food) => total + food.fat, 0)}g</Text>
          <Text>Total Carbs: {selectedTime.night.reduce((total, food) => total + food.carbs, 0)}g</Text>
          <View>
          {selectedTime.night.map((food, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveFood('night', index)}>
          <Text>{food.name} - {food.quantity}</Text>
          </TouchableOpacity>
          ))}
          </View>
          </View>
        </View>
    </View>
    </View>
  </View>
</View>

  );
  
};

const styles = StyleSheet.create({
    // ... (existing styles)
  
    bigRectangle: {
      flexDirection: 'row',
      width: '100%',
      height: 400, // Height of the big rectangle
      backgroundColor: 'lightgray', // Example background color
      marginBottom: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
 
      // Other styles for the big rectangle
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },

    infoContainer: {
      marginTop: 15,
      justifyContent: 'space-between',
      padding: 0,
      backgroundColor: 'lightgray',

      width: '30%', // Adjust as needed
      height: '100%',
    },

    square: {
      flex: 1,
      aspectRatio: 1, // Maintain a 1:1 aspect ratio
      backgroundColor: 'lightgray', // Example background color
      marginRight: 0,
      height: 400,
      // Other styles for the squares
    },
    pieChartContainer: {
      justifyContent: 'center',
      alignItems: 'center',
  

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
