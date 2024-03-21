// import React from 'react';
// import { View, Text, Picker, StyleSheet } from 'react-native';
// import styles from '/src/styles/inputStyles';

// const DayPicker = ({ selectedDay, onDayChange, daysOfWeek }) => (
//   <View style={styles.container}>
//     <Text style={styles.text}>Select Day:</Text>
//     <Picker selectedValue={selectedDay} onValueChange={onDayChange} style={styles.input}>
//       <Picker.Item label="Select" value="" />
//       {daysOfWeek.map((day, index) => (
//         <Picker.Item key={index} label={day} value={day} />
//       ))}
//     </Picker>
//   </View>
// );

// export default DayPicker;


// import React from 'react';
// import { View, Text } from 'react-native';
// import DatePicker from 'react-native-datepicker';
// import styles from '/src/styles/inputStyles';

// const DayPicker = ({ selectedDay, onDayChange }) => (
//   <View style={styles.container}>
//     <Text style={styles.text}>Select Day:</Text>
//     <DatePicker
//       style={styles.input}
//       date={selectedDay}
//       mode="date"
//       placeholder="Select date"
//       format="YYYY-MM-DD"
//       confirmBtnText="Confirm"
//       cancelBtnText="Cancel"
//       onDateChange={onDayChange}
//     />
//   </View>
// );

// export default DayPicker;

import React from 'react';
import DatePicker from 'react-datepicker';
import {format, parseISO} from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const DayPicker = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (date) => {
    onDateChange(format(date, 'yyyy-MM-dd'));
  };

  const dateObject = selectedDate ? parseISO(selectedDate) : null;
  return (
  <div>
    <h2>Select Date:</h2>
    <DatePicker selected={selectedDate} onChange={handleDateChange} />
  </div>
);
};

export default DayPicker;
