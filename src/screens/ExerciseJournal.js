import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, Button, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const AddedExerciseInfo = ({ addedExercise }) => {
  return (
    <View>
      <Text>Recently Added Exercise:</Text>
      <Text>Name: {addedExercise.name}</Text>
      <Text>Calories Burned: {addedExercise.caloriesBurned}</Text>
      <Text>Duration: {addedExercise.duration} minutes</Text>
      <Text>Day: {addedExercise.day}</Text>
    </View>
  );
};

const ExerciseJournalScreen = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedOption, setSelectedValue] = useState('');
  const exerciseTypes = ['Cardio', 'Strength Training', 'Flexibility', 'Other'];
  const [goal, setGoal] = useState(500); 
  const [currentValue, setCurrentValue] = useState(0);
  const [progress, setProgress] = useState((currentValue / goal) * 100);
  const [selectedExerciseType, setSelectedExerciseType] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedTime, setSelectedTime] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [recentlyAddedExercise, setRecentlyAddedExercise] = useState(null);

  const exerciseOptions = [
    { name: 'Running', caloriesBurned: 300 },
    { name: 'Weightlifting', caloriesBurned: 200 },
    { name: 'Yoga', caloriesBurned: 150 },
    { name: 'Swimming', caloriesBurned: 400 },
    
  ];

  const handleExerciseTypeChange = (value) => {
    setSelectedExerciseType(value);
  };

  const handleSelectChange = (value) => {
    setSelectedExercise(value);
  };

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const handleCaloriesBurnedChange = (text) => {
    setCaloriesBurned(text);
  };

  const handleDurationChange = (text) => {
    setDuration(text);
  };

  const addCaloriesBurnedToPeriod = () => {
    if (
      selectedExercise !== '' &&
      selectedExerciseType !== '' &&
      selectedDay !== '' &&
      caloriesBurned !== '' &&
      duration !== ''
    ) {
      const exerciseObj = exerciseOptions.find((exercise) => exercise.name === selectedExercise);
      if (exerciseObj) {
        const updatedSelectedTime = { ...selectedTime };
  
        const exerciseItem = {
          name: selectedExercise,
          caloriesBurned: parseInt(caloriesBurned, 10),
          duration: parseInt(duration, 10),
        };
  
        updatedSelectedTime[selectedDay].push(exerciseItem);
        setSelectedTime(updatedSelectedTime);
  
       
        const updatedCurrentValue = calculateAllTotalCaloriesBurned();
        setCurrentValue(updatedCurrentValue);
  
        setSelectedExercise('');
        setSelectedExerciseType('');
        setSelectedDay('');
        setCaloriesBurned('');
        setDuration('');
        setRecentlyAddedExercise(exerciseItem);
  
       
        const updatedData = {
          labels: Object.keys(updatedSelectedTime),
          datasets: [
            {
              data: Object.values(updatedSelectedTime).map((exercises) =>
                exercises.reduce((totalCalories, exercise) => totalCalories + exercise.caloriesBurned, 0)
              ),
            },
          ],
        };
        setChartData(updatedData);
  
        
        updateProgressBar();
      }
    }
  };
  

  const handleAdd = () => {
    addCaloriesBurnedToPeriod();
  };

  const calculateAllTotalCaloriesBurned = () => {
    const allCaloriesBurned = Object.values(selectedTime)
      .flat()
      .reduce((totalCalories, exercise) => {
        return totalCalories + exercise.caloriesBurned;
      }, 0);
    return allCaloriesBurned;
  };

 
  const ProgressBar = ({ progress }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]}></View>
      </View>
    );
  };

  
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

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    strokeWidth: 2,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleBig}>Exercise Journal</Text>
        <Text style={styles.title}>
          {currentDay} - {currentTime}
        </Text>
        <ProgressBar progress={progress} />
        <Text>
          Progress: {currentValue}/{goal} Calories Burned
        </Text>
      </View>
      <View style={styles.bigRectangle}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
          {recentlyAddedExercise && <AddedExerciseInfo addedExercise={recentlyAddedExercise} />}
          <BarChart
            data={{
              labels: Object.keys(selectedTime),
              datasets: [
                {
                  data: Object.values(selectedTime).map((exercises) =>
                    exercises.reduce((totalCalories, exercise) => totalCalories + exercise.caloriesBurned, 0)
                  ),
                },
              ],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="Calories"
            chartConfig={chartConfig}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.square}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 25, justifyContent: 'center' }}>
            <Text>Select Exercise Type:</Text>
            <View style={{ marginBottom: 0 }}>
              <Picker
                selectedValue={selectedExerciseType}
                onValueChange={handleExerciseTypeChange}
              >
                <Picker.Item label="Select" value="" />
                {exerciseTypes.map((type, index) => (
                  <Picker.Item key={index} label={type} value={type} />
                ))}
              </Picker>
            </View>
            <View>
              <Picker
                selectedValue={selectedDay}
                onValueChange={handleDayChange}
              >
                <Picker.Item label="Select Day" value="" />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Calories Burned"
                value={caloriesBurned}
                onChangeText={handleCaloriesBurnedChange}
                keyboardType="numeric"
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Duration (min)"
                value={duration}
                onChangeText={handleDurationChange}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Picker
                selectedValue={selectedExercise}
                onValueChange={handleSelectChange}
              >
                <Picker.Item label="Select Exercise" value="" />
                {exerciseOptions.map((exercise, index) => (
                  <Picker.Item key={index} label={exercise.name} value={exercise.name} />
                ))}
              </Picker>
            </View>
            <Button title="Add" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


  bigRectangle: {
    flexDirection: 'row',
    width: '100%',
    height: 400,
    backgroundColor: 'lightgray',
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid lightblue',

},
bigRectangle: {
  flexDirection: 'row',
  width: '100%',
  height: 400, 
  backgroundColor: 'lightgray', 
  marginBottom: 20,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

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

  width: '30%', 
  height: '100%',
},

square: {
  flex: 1,
  aspectRatio: 1, 
  backgroundColor: 'lightgray', 
  marginRight: 0,
  height: 400,
  
},
pieChartContainer: {
  justifyContent: 'center',
  alignItems: 'center',

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
    backgroundColor: 'green', 
    borderRadius: 10,
  },


});

export default ExerciseJournalScreen;
