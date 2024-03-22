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
      <Text>Serving (100g): {addedFood.quantity}</Text>
    </View>
  );
};

const JournalScreen = ({navigation}) => {
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
  const [totalProtein, setTotalProtein] = useState(0);
  const [quantity, setQuantity] = useState('1'); 
  const [recentlyAddedFood, setRecentlyAddedFood] = useState(null);




  const foodOptions = [
    { name: 'Apple', calories: 52, fat: 0.2, carbs: 14, protein: 0.3 },
    { name: 'Asparagus', calories: 20, fat: 0.2, carbs: 3, protein: 2.2 },
    { name: 'Avocado', calories: 160, fat: 15, carbs: 9, protein: 2 },
    { name: 'Bacon', calories: 458, fat: 42, carbs: 0, protein: 15 },
    { name: 'Banana', calories: 89, fat: 0.3, carbs: 23, protein: 1.1 },
    { name: 'Beef', calories: 250, fat: 17, carbs: 0, protein: 26 },
    { name: 'Blueberries', calories: 57, fat: 0.3, carbs: 14, protein: 0.7 },
    { name: 'Broccoli', calories: 34, fat: 0.4, carbs: 7, protein: 2.8 },
    { name: 'Brussels Sprouts', calories: 43, fat: 0.4, carbs: 9, protein: 3.4 },
    { name: 'Cabbage', calories: 25, fat: 0.1, carbs: 6, protein: 1.3 },
    { name: 'Carrot', calories: 41, fat: 0.2, carbs: 10, protein: 0.9 },
    { name: 'Cashews', calories: 553, fat: 44, carbs: 30, protein: 18 },
    { name: 'Cauliflower', calories: 25, fat: 0.3, carbs: 5, protein: 2 },
    { name: 'Celery', calories: 16, fat: 0.2, carbs: 3, protein: 0.7 },
    { name: 'Cheese', calories: 402, fat: 33, carbs: 1.3, protein: 25 },
    { name: 'Chicken Breast', calories: 165, fat: 3.6, carbs: 0, protein: 31 },
    { name: 'Chicken Wings', calories: 203, fat: 12, carbs: 0, protein: 20 },
    { name: 'Cherries', calories: 50, fat: 0.3, carbs: 12, protein: 1 },
    { name: 'Cucumber', calories: 16, fat: 0.1, carbs: 4, protein: 0.7 },
    { name: 'Eggplant', calories: 25, fat: 0.2, carbs: 6, protein: 1 },
    { name: 'Eggs', calories: 155, fat: 11, carbs: 1.1, protein: 13 },
    { name: 'Grapes', calories: 69, fat: 0.2, carbs: 18, protein: 0.7 },
    { name: 'Green Beans', calories: 31, fat: 0.1, carbs: 7, protein: 1.8 },
    { name: 'Kale', calories: 49, fat: 0.9, carbs: 9, protein: 4.3 },
    { name: 'Lentils', calories: 116, fat: 0.4, carbs: 20, protein: 9 },
    { name: 'Lettuce', calories: 15, fat: 0.2, carbs: 2.9, protein: 1.4 },
    { name: 'Mango', calories: 60, fat: 0.4, carbs: 15, protein: 0.8 },
    { name: 'Milk', calories: 42, fat: 1, carbs: 5, protein: 3.4 },
    { name: 'Oatmeal', calories: 389, fat: 6.9, carbs: 66, protein: 16.9 },
    { name: 'Onion', calories: 40, fat: 0.1, carbs: 9, protein: 1.1 },
    { name: 'Orange', calories: 47, fat: 0.1, carbs: 12, protein: 1 },
    { name: 'Pasta', calories: 131, fat: 1, carbs: 25, protein: 5 },
    { name: 'Peach', calories: 39, fat: 0.3, carbs: 10, protein: 0.9 },
    { name: 'Peanut Butter', calories: 588, fat: 50, carbs: 20, protein: 25 },
    { name: 'Pepper', calories: 20, fat: 0.2, carbs: 4.6, protein: 0.9 },
    { name: 'Pineapple', calories: 50, fat: 0.1, carbs: 13, protein: 0.5 },
    { name: 'Pizza', calories: 266, fat: 10, carbs: 28, protein: 12 },
    { name: 'Pork', calories: 242, fat: 16, carbs: 0, protein: 22 },
    { name: 'Potato', calories: 77, fat: 0.1, carbs: 17, protein: 2 },
    { name: 'Quinoa', calories: 120, fat: 2, carbs: 21, protein: 4 },
    { name: 'Radish', calories: 16, fat: 0.1, carbs: 3.4, protein: 0.7 },
    { name: 'Rice', calories: 130, fat: 0.3, carbs: 28, protein: 2.7 },
    { name: 'Salad', calories: 15, fat: 0.2, carbs: 2.9, protein: 1.4 },
    { name: 'Shrimp', calories: 99, fat: 0.3, carbs: 0.6, protein: 20 },
    { name: 'Spinach', calories: 23, fat: 0.4, carbs: 3.6, protein: 2.9 },
    { name: 'Steak', calories: 271, fat: 19, carbs: 0, protein: 25 },
    { name: 'Strawberries', calories: 32, fat: 0.3, carbs: 8, protein: 0.7 },
    { name: 'Sushi', calories: 168, fat: 7, carbs: 27, protein: 5 },
    { name: 'Tomato', calories: 18, fat: 0.2, carbs: 4, protein: 0.9 },
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
      const quantityValue = parseInt(quantity, 10) || 1; // Make sure the quantity is an integer for food
  
      if (foodObj) {
        const updatedSelectedTime = { ...selectedTime };
        const foodItem = {
          name: selectedFood,
          calories: foodObj.calories * quantityValue,
          fat: foodObj.fat * quantityValue,
          carbs: foodObj.carbs * quantityValue,
          protein: foodObj.protein * quantityValue, // Include protein calculation
          quantity: quantityValue,
        };
  
        updatedSelectedTime[selectedTimeOfDay].push(foodItem);
        setSelectedTime(updatedSelectedTime);
  
        // Update total fat, carbs, and protein
        const updatedTotalFat = totalFat + foodObj.fat * quantityValue;
        const updatedTotalCarbs = totalCarbs + foodObj.carbs * quantityValue;
        const updatedTotalProtein = totalProtein + foodObj.protein * quantityValue;
        setTotalFat(updatedTotalFat);
        setTotalCarbs(updatedTotalCarbs);
        setTotalProtein(updatedTotalProtein);
  
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
    
      // Update total fat, carbs, and protein when removing food
      const updatedTotalFat = totalFat - removedFood.fat;
      const updatedTotalCarbs = totalCarbs - removedFood.carbs;
      const updatedTotalProtein = totalProtein - removedFood.protein;
      setTotalFat(updatedTotalFat);
      setTotalCarbs(updatedTotalCarbs);
      setTotalProtein(updatedTotalProtein);
    
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
          {renderPieChart('protein')}
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
          <Text>Total Protein: {selectedTime.morning.reduce((total, food) => total + food.protein, 0)}g</Text>
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
          <Text>Total Protein: {selectedTime.afternoon.reduce((total, food) => total + food.protein, 0)}g</Text>
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
          <Text>Total Protein: {selectedTime.night.reduce((total, food) => total + food.protein, 0)}g</Text>
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
  <View style={styles.bottomContainer}>
  <Button title="Food Journal" onPress={() => navigation.navigate('Journal')} />
        <Button title="Sleep Journal" onPress={() => navigation.navigate('SleepJournal')} />
        <Button title="Weight Journal" onPress={() => navigation.navigate('WeightJournalScreen')} />
        <Button title="Exercise Journal" onPress={() => navigation.navigate('ExerciseJournal')} />
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
      marginTop: 20, // Adjust as needed
      marginBottom: 20, // Adjust as needed
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
