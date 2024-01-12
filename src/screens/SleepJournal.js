import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, Button, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const AddedSleepInfo = ({ addedSleep }) => {
  return (
    <View>
      <Text>Recently Added Sleep:</Text>
      <Text>Day: {addedSleep.day}</Text>
      <Text>Duration: {addedSleep.duration} minutes</Text>
    </View>
  );
};

const SleepJournalScreen = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [sleepDuration, setSleepDuration] = useState('');
  const [selectedTime, setSelectedTime] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [recentlyAddedSleep, setRecentlyAddedSleep] = useState(null);
  const [goal, setGoal] = useState(500);
  const [currentValue, setCurrentValue] = useState(0);
  const [progress, setProgress] = useState((currentValue / goal) * 100);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const handleSleepDurationChange = (text) => {
    setSleepDuration(text);
  };

  const addSleepToPeriod = () => {
    if (selectedDay !== '' && sleepDuration !== '') {
      const updatedSelectedTime = { ...selectedTime };

      const sleepItem = {
        day: selectedDay,
        duration: parseInt(sleepDuration, 10),
      };

      updatedSelectedTime[selectedDay].push(sleepItem);
      setSelectedTime(updatedSelectedTime);

      const updatedCurrentValue = calculateAllTotalSleepDuration();
      setCurrentValue(updatedCurrentValue);

      setSelectedDay('');
      setSleepDuration('');
      setRecentlyAddedSleep(sleepItem);

      const updatedData = {
        labels: Object.keys(updatedSelectedTime),
        datasets: [
          {
            data: Object.values(updatedSelectedTime).map((sleeps) =>
              sleeps.reduce((totalDuration, sleep) => totalDuration + sleep.duration, 0)
            ),
          },
        ],
      };
      setChartData(updatedData);

      updateProgressBar();
    }
  };

  const calculateAllTotalSleepDuration = () => {
    const allSleepDuration = Object.values(selectedTime)
      .flat()
      .reduce((totalDuration, sleep) => {
        return totalDuration + sleep.duration;
      }, 0);
    return allSleepDuration;
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

  const handleAdd = () => {
    addSleepToPeriod();
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
        <Text style={styles.titleBig}>Sleep Journal</Text>
        <Text style={styles.title}>
          {currentDay} - {currentTime}
        </Text>
        <ProgressBar progress={progress} />
        <Text>
          Progress: {currentValue}/{goal} Minutes of Sleep
        </Text>
      </View>
      <View style={styles.bigRectangle}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
          {recentlyAddedSleep && <AddedSleepInfo addedSleep={recentlyAddedSleep} />}
          <BarChart
            data={{
              labels: Object.keys(selectedTime),
              datasets: [
                {
                  data: Object.values(selectedTime).map((sleeps) =>
                    sleeps.reduce((totalDuration, sleep) => totalDuration + sleep.duration, 0)
                  ),
                },
              ],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="Sleep Duration (mins)"
            chartConfig={chartConfig}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.square}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 25, justifyContent: 'center' }}>
            <View>
              <Picker selectedValue={selectedDay} onValueChange={handleDayChange}>
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
                placeholder="Sleep Duration (mins)"
                value={sleepDuration}
                onChangeText={handleSleepDurationChange}
                keyboardType="numeric"
              />
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
  

export default SleepJournalScreen;
