import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Button, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import AddedExerciseInfo from '../ExerciseJournal/AddedExerciseInfo'; 
import ProgressBar from '../ExerciseJournal/ProgressBar';
import ExerciseTypePicker from '../ExerciseJournal/ExerciseTypePicker';
import DayPicker from '../ExerciseJournal/DayPicker';
import CaloriesInput from '../ExerciseJournal/CaloriesInput';
import DurationInput from '../ExerciseJournal/DurationInput';
import ExercisePicker from '../ExerciseJournal/ExercisePicker';
import BarChartComponent from '../ExerciseJournal/BarChartComponent'; 
import Title from '../ExerciseJournal/Title';

const ExerciseJournalScreen = ({navigation}) => {
  const [selectedExerciseType, setSelectedExerciseType] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [calories, setCalories] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [addedExercise, setAddedExercise] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [goal, setGoal] = useState(500);
  const [dayCalories, setDayCalories] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  const handleAddExercise = () => {
    const newExercise = {
      type: selectedExerciseType,
      day: selectedDay,
      calories: parseInt(calories),
      duration: duration,
      exercise: selectedExercise,
    };

    // retrieve token from local storage
    const token = localStorage.getItem('token');

    // make a POST request to the server to add the new exercise
    fetch('http://localhost:8080/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,  // attach the token as an authorization header
      },
      body: JSON.stringify({
        type: newExercise.type,
        duration: newExercise.duration,
        caloriesBurned: newExercise.calories,
        day: newExercise.day,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.message) {
        console.log(data.message);
      } 
    })
    .catch(error => {
      console.error('Error adding exercise:', error);
    });

    setAddedExercise(newExercise);
    
    // Update current value
    setCurrentValue(currentValue + parseInt(calories));
    updateProgressBar();

  // Update calories for the selected day
    setDayCalories(prevDayCalories => ({
      ...prevDayCalories,
      [selectedDay]: (prevDayCalories[selectedDay] || 0) + parseInt(calories),
    }));


    // Reset form
    setSelectedExerciseType('');
    setSelectedDay('');
    setCalories('');
    setDuration('');
    setSelectedExercise(null);
  };


  const calculateExactDate = () => {
    const current = new Date();
    setCurrentDay(current.toLocaleDateString());
    setCurrentTime(current.toLocaleTimeString());
  };

  const updateProgressBar = () => {
    const calculatedProgress = (currentValue / goal) * 100;
    setProgress(calculatedProgress);
  };

  useEffect(() => {
    calculateExactDate();
    updateProgressBar();
  }, [currentValue, goal]);



  const exerciseTypes = ['Cardio', 'Strength', 'Flexibility'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const exercises = [{ name: 'Running', type: 'Cardio' }, { name: 'Push-ups', type: 'Strength' }];


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title
        currentDay={currentDay}
        currentTime={currentTime}
        progress={progress}
        currentValue={currentValue}
        goal={goal}
      />
  
      <BarChartComponent
        dayCalories={dayCalories}
      />
  
      {/* Added buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Journal')}>
          <Text>Food Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('SleepJournal')}>
          <Text>Sleep Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('WeightJournalScreen')}>
          <Text>Weight Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text>Exercise Journal</Text>
        </TouchableOpacity>
      </View>
  
      <ExerciseTypePicker
        selectedExerciseType={selectedExerciseType}
        onExerciseTypeChange={setSelectedExerciseType}
        exerciseTypes={exerciseTypes}
      />
      <DayPicker
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
        daysOfWeek={daysOfWeek}
      />
      <CaloriesInput
        calories={calories}
        onCaloriesChange={setCalories}
      />
      <DurationInput
        duration={duration}
        onDurationChange={setDuration}
      />
      <ExercisePicker
        selectedExercise={selectedExercise}
        onExerciseChange={setSelectedExercise}
        exercises={exercises}
      />
      <Button title="Add Exercise" onPress={handleAddExercise} />
      {addedExercise && <AddedExerciseInfo addedExercise={addedExercise} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', // Ensure buttons appear above ScrollView content
    paddingVertical: 10,
  },
  bottomButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});


export default ExerciseJournalScreen;
