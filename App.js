import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RegistrationScreen from './src/screens/registration';
import LoginScreen from './src/screens/LoginScreen'; // Add this line
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'; // Add this line
import GoalsScreen from './src/screens/GoalsScreen'
import JournalScreen from './src/screens/Journal';
import WeightJournalScreen from './src/screens/WeightJournalScreen'
import ExerciseJournalScreen from './src/screens/ExerciseJournal';
import SleepJournalScreen from './src/screens/SleepJournal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
        <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />  
        <Stack.Screen name="ExerciseJournal" component={ExerciseJournalScreen} />
        <Stack.Screen name="WeightJournalScreen" component={WeightJournalScreen} />
        <Stack.Screen name="SleepJournal" component={SleepJournalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
