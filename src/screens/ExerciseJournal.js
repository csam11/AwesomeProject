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
import HistoricalActivities from '../ExerciseJournal/HistoricalActivities';



const ExerciseJournalScreen = ({navigation}) => {
  const [selectedExerciseType, setSelectedExerciseType] = useState('');
  //const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [calories, setCalories] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [addedExercise, setAddedExercise] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [goal, setGoal] = useState(500);
  const [activities, setActivities] = useState([]); // new state to store activities retrieved from the server
  const [lastSevenDays, setLastSevenDays] = useState([]); // new state to store the last seven days of activities
  const [dayCalories, setDayCalories] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  // retrieve activities from the server
  useEffect(() => {
    // retrieve token from local storage
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/activities', {
      method: 'GET',
      headers: {
        'x-auth-token': token,  // attach the token as an authorization header
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Retrieved activities:', data);
      setActivities(data);

     

      const newLastSevenDays = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const totalCalories = data
          .filter(activity => {
            // Convert both dates to YYYY-MM-DD format for comparison
            const activityDate = new Date(activity.date).toISOString().split('T')[0];
            const currentDate = date.toISOString().split('T')[0];
            return activityDate === currentDate;
          })
          .reduce((total, activity) => total + activity.caloriesBurned, 0);
        newLastSevenDays.push({ date: date.toDateString(), calories: totalCalories });
      }
      // check if the current day is different from the last day in lastSevenDays
      const today = new Date().toISOString().split('T')[0];
      let lastDay;
      if (newLastSevenDays.length > 0) {
        lastDay = new Date(newLastSevenDays[newLastSevenDays.length - 1].date).toISOString().split('T')[0];
      }
      //const lastDay = new Date(lastSevenDays[lastSevenDays.length - 1].date).toISOString().split('T')[0];
      if (lastDay && today !== lastDay) {
        if (lastSevenDays.length === 7) {
          newLastSevenDays.shift(); // remove the oldest day
        }
        newLastSevenDays.push({ date: new Date().toDateString(), calories: 0 }); // add a new day
      }
      setLastSevenDays(newLastSevenDays);
      console.log('Last seven days:', newLastSevenDays);
    })
    .catch(error => {
      console.error('Error retrieving activities:', error);
    });
  }, []);

  // Function to handle adding a new exercise
  const handleAddExercise = () => {
    const newExercise = {
      type: selectedExerciseType,
      date: selectedDate,
      calories: parseInt(calories),
      duration: duration,
      exercise: selectedExercise,
      //date: new Date(),
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
        date: new Date(newExercise.date)
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.message) {
        console.log(data.message);
      } 
      // update lastSevenDays with the new exercise
      const today = new Date().toISOString().split('T')[0];
      setLastSevenDays(prevLastSevenDays => {
        const newLastSevenDays = prevLastSevenDays.map(day => {
          if (day.date && !isNaN(new Date(day.date))) {
            const dayDate = new Date(day.date).toISOString().split('T')[0];
            if (dayDate === today) {
              return { ...day, calories: day.calories + newExercise.calories };
            }
          }
          return day;
        })
        if(newLastSevenDays.length === 7) {
          newLastSevenDays.shift(); // remove the oldest day
        }
        const exerciseDate = typeof newExercise.date === 'string' ? newExercise.date : new Date(newExercise.date).toDateString();
        newLastSevenDays.push({ date: exerciseDate, calories: newExercise.calories });
        console.log('Last seven days:', newLastSevenDays);
        return newLastSevenDays;
      });

      // update activities with the new exercise
    setActivities(prevActivities => {
      const newActivity = {
        type: newExercise.type,
        date: new Date(newExercise.date),
        caloriesBurned: newExercise.calories,
        duration: newExercise.duration,
        exercise: newExercise.exercise,
    };
    return [...prevActivities, newActivity];
  });


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
      [selectedDate]: (prevDayCalories[selectedDate] || 0) + parseInt(calories),
    }));


    // Reset form
    setSelectedExerciseType('');
    //setSelectedDay('');
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

      <HistoricalActivities lastSevenDays={lastSevenDays} />

      {/* <BarChartComponent
        dayCalories={dayCalories}
        
      /> */}
  
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
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        // daysOfWeek={daysOfWeek}
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
