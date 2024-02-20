import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import customStyle from '../../Styles/commonStyle';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment-timezone';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {handleShopEmployeeList} from '../../Data/FetchData';
import {AuthContext} from '../../Context/AuthContext';
import {
  getAppoinmetData,
  initAppointmentTable,
  insertAppointmentData,
} from '../../Database/AppointmentTable';

const Appointments = () => {
  const navigation = useNavigation();

  // context api
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  const {t} = useTranslation();

  // ======= date========
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  // ======= time ========
  const defaultEndTime = new Date();
  defaultEndTime.setHours(18, 0, 0, 0);

  const [fromTime, setFromTime] = useState(new Date()); // State for selected time
  const [showTimePicker, setShowTimePicker] = useState(false); // State for time picker visibility

  const appointmentDate = moment(startDate).format('YYYY-MM-DD');
  // const appointmentTime = fromTime.toLocaleTimeString();

  const appointmentTime = moment(fromTime).format('hh:mm:ss');

  console.log("appoint time",appointmentTime)

  // console.log('from time', appointmentTime);
  // console.log('start date', appointmentDate);  moment(fromTime).format('HH:mm:ss')

  // others hooks
  const [address, setAddress] = useState('');
  const [employee, setEmployee] = useState(null);
  const [employeeId, setEmployeId] = useState();

  const [appointmentData, setAppointmentData] = useState([]);

  console.log(
    'this is saved appointment data',
    JSON.stringify(appointmentData, null, 2),
  );

  useEffect(() => {
    initAppointmentTable();
    getData();
    // deleteData()
  }, []);

  // console.log("time",appointmentTime)
  // ============== date time formate===================

  const formatDate = date => {
    return moment(date).format('DD/MM/YYYY');
  };

  const formatTime = time => {
    return moment(time).format('h:mm A');
  };

  // handle start date change

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // handle time change
  const handleFromTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');

    if (selectedTime) {
      setFromTime(selectedTime);
    }
  };

  // handle submit
  const handleSaveButtonClick = () => {
    const newData = {
      CustomerId: 'Cust456',
      Address: address,
      AppointmentDate: appointmentDate,
      AppointmentTime: appointmentTime,
      AssignEmployeeId: employeeId,
    };

    navigation.navigate('Appointment Status');

    console.log(
      'This is appointment details',
      JSON.stringify(newData, null, 2),
    );
  };

  // get emlpoyee list
  const getEmployeeList = async () => {
    try {
      // Call the API function and wait for the result
      const result = await handleShopEmployeeList(userDetails);
      setEmployee(result);
    } catch (error) {
      console.error('Error in YourComponent:', error);
    }
  };
  useEffect(() => {
    getEmployeeList();
  }, []);

  // ======== save data into sqlite storage =======

  const CustomerId = 'Cust456';
  const Address = address;
  const AppointmentDate = appointmentDate;
  const AppointmentTime = appointmentTime;
  const AssignEmployeeId = employeeId;

  const saveData = () => {
    insertAppointmentData(
      CustomerId,
      Address,
      AppointmentDate,
      AppointmentTime,
      AssignEmployeeId,
      success => {
        if (success) {
          Alert.alert('Appointment Data inserted successfully');
          navigation.goBack()
          getData();
        } else {
          Alert.alert('Failed to insert appointment data');
        }
      },
    );
  };

  // ======= get data from sqlite storage ========
  const getData = () => {
    getAppoinmetData(item => setAppointmentData(item));
  };

  return (
    <ScrollView
      style={customStyle.container}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.mainContainer}>
        {/* top header text */}

        <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
            Appointment Info
          </Text>
        </View>

        {/* sales order date */}

        <View>
          <Text style={styles.label}>Appointment Date</Text>

          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.DayButtonContainer}>
            <Icon
              name="calendar-alt"
              size={20}
              // color="white"
              style={styles.icon}
            />
            <Text style={styles.dateText}>
              {/* {moment(startDate).format('DD/MM/YYYY')} */}
              {formatDate(startDate)}
            </Text>
          </TouchableOpacity>

          {/* Date picker */}
          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleStartDateChange}
            />
          )}
        </View>

        {/* time */}

        <View>
          <Text style={styles.label}>Time</Text>

          <View>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.DayButtonContainer}>
              <Icon name="clock" size={20} style={styles.icon} />
              <Text style={styles.dateText}>
                {formatTime(fromTime)}

                {/* {fromTime.toLocaleTimeString()} */}
              </Text>
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              // testID="dateTimePicker"
              testID="timePicker"
              value={fromTime}
              display="spinner" // Set display to "spinner" for seconds
              mode="time" // Set mode to "time" for time picker
              onChange={handleFromTimeChange}
              timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
            />
          )}
        </View>

        {/* <View style={{marginTop: 50}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button onPress={showTimepicker} title="Open Time Picker" />
            <Text style={{marginLeft: 10}}>{time.toLocaleTimeString()}</Text>
          </View>

          {show && (
            <DateTimePicker
              testID="timePicker"
              value={time}
              mode="time"
              display="spinner"
              onChange={onChange}
              timeZoneOffsetInMinutes={new Date().getTimezoneOffset()}
            />
          )}
        </View> */}

        {/* address */}

        <View style={styles.leaveContent}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.dropdownPicker}>
            <TextInput
              // multiline
              // numberOfLines={4}
              style={[styles.input]}
              placeholder="Address"
              placeholderTextColor="gray"
              onChangeText={text => setAddress(text)}
              value={address}
            />
          </View>
        </View>

        {/* Purpose */}

        <View style={styles.leaveContent}>
          <Text style={styles.label}>Purpose</Text>
          <View style={styles.dropdownPicker}>
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Purpose"
              placeholderTextColor="gray"
              // onChangeText={text => setReason(text)}
              // value={reason}
            />
          </View>
        </View>

        {/* assigned employee */}
        <View>
          <Text style={styles.label}>Assigned Employee</Text>
          <View style={styles.dropdownPicker}>
            <Picker
              selectedValue={employeeId}
              onValueChange={(itemValue, itemIndex) => setEmployeId(itemValue)}
              style={{color: 'gray'}}
              dropdownIconColor="gray">
              <Picker.Item label="Select" value="Select" />
              {employee?.map((value, index) => (
                <Picker.Item
                  style={{fontSize: 12}}
                  key={index}
                  label={value.fullName}
                  value={value.empId}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* button */}

        {/* <View style={{alignSelf: 'center', marginVertical: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Appointment Status')}>
            <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
              Save & Next
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* button */}

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
            marginTop: 100,
            gap: 20,
          }}>
          <View
            style={{
              backgroundColor: '#F7D2D2AB',
              paddingHorizontal: 40,
              paddingVertical: 12,
              borderRadius: 50,
              borderColor: 'red',
              borderWidth: 1,
            }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('Activity Check')}
              onPress={() => navigation.goBack()}>
              <Text style={{color: 'red', fontWeight: '700'}}>Back</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#04C1AA30',
              paddingHorizontal: 40,
              paddingVertical: 12,
              borderRadius: 50,
              borderColor: '#04C1AA',
              borderWidth: 1,
            }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('Activity Check')}
              //   onPress={handleNewActivity}

              // onPress={() => handleSaveButtonClick()}
              onPress={() => saveData()}>
              <Text style={{color: '#04C1AA', fontWeight: '700'}}>
                Save & Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  // label
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    fontWeight: '700',
  },

  dropdownPicker: {
    borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    height: 45,
    // backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },

  mainContainer: {
    paddingHorizontal: 15,
  },

  DayButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingLeft: 15,
    height: 45,
    borderRadius: 5,
    // width: 130,
    // width: "80%",
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#0B87AC',
    // flex:1,
  },

  icon: {
    marginRight: 10,
    color: 'gray',
  },
  dateText: {
    color: 'black', // Change this to your desired text color
    fontSize: 16,
  },
  // label
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    fontWeight: '700',
  },

  input: {
    width: '100%',
    height: 45,
    // borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,
    paddingHorizontal: 15,
    color: 'gray',
    // flex: 1,
  },

  // button

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2FD790',
    elevation: 5,
    // flex:1,
  },
});
