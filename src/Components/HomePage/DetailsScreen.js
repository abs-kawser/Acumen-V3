import React, { useState } from 'react';
import { View, Text, StyleSheet, Button ,Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DetailsScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setError('End date cannot be earlier than the start date');
      } else {
        setError('');
      }
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate && selectedDate < startDate) {
      setError('End date cannot be earlier than the start date');
    } else {
      setError('');
    }
    setEndDate(selectedDate);
  };

//   const handleStartDateChange = (event, selectedDate) => {
//     setShowStartDatePicker(false);
//     if (selectedDate) {
//       setStartDate(selectedDate);
//       if (selectedDate > endDate) {
//         setError('End date cannot be earlier than the start date');
//       } else {
//         setError('');
//       }
//     }
//   };

//   const handleEndDateChange = (event, selectedDate) => {
//   setShowEndDatePicker(false);
//   if (selectedDate && selectedDate < startDate) {
//     setError('End date cannot be earlier than the start date');
//   } else {
//     setError('');
//   }
//   setEndDate(selectedDate);
// };

  // const handleEndDateChange = (event, selectedDate) => {
  //   setShowEndDatePicker(false);
  //   if (selectedDate) {
  //     setEndDate(selectedDate);
  //     if (selectedDate < startDate) {
  //       setError('End date cannot be earlier than the start date');
  //     } else {
  //       setError('');
  //     }
  //   }
  // };

  const handleSubmit = () => {
    // if (endDate < startDate) {
    //   setError('End date cannot be earlier than the start date');
    // } else {
    //   setError('');
    //   // Handle your submission logic here
    //   alert(
    //     `Start Date: ${formatDate(startDate)}\nEnd Date: ${formatDate(endDate)}`
    //   );
    // }

     if (error) {
      // There is an error, do not show the alert
      return;
    }

    Alert.alert(
      `Start Date: ${formatDate(startDate)}\nEnd Date: ${formatDate(endDate)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text>Start Date:</Text>
      <Button
        title={formatDate(startDate)}
        onPress={() => setShowStartDatePicker(true)}
      />
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={handleStartDateChange}
        />
      )}

      <Text>End Date:</Text>
      <Button
        title={formatDate(endDate)}
        onPress={() => setShowEndDatePicker(true)}
      />
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          onChange={handleEndDateChange}
        />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Submitt" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default DetailsScreen;


// ==================

// useEffect(() => {
//   const getUserData = async () => {
//     try {
//       const userData = await AsyncStorage.getItem("userData");

//       if (userData !== null) {
//         setIsLoggedIn((prevUserDetails) => ({
//           ...prevUserDetails,
//           login: true,
//           userDetails: JSON.parse(userData),
//         }));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getUserData();
// }, []);

// return (
//   <NavigationContainer>


//     {isLoggedIn.login && isLoggedIn.userDetails ? <StackNavigator /> : <AuthNavigator /> 
       
//     }
//   </NavigationContainer>