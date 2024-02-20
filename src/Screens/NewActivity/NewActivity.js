import {
  Button,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {RadioButton} from 'react-native-paper';
import {Switch} from 'react-native-switch';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import {AuthContext} from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LeaveTypeData, activeEmploye} from '../../Data/FetchData';

import moment from 'moment';
import 'moment-timezone';
import base64 from 'base-64';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import customStyle from '../../Styles/commonStyle';
import {SelectList} from 'react-native-dropdown-select-list';
import {Base_Url, PASSWORD, USERNAME} from '../../../variable';

import {Dropdown} from 'react-native-element-dropdown';
import {CustomerContext} from '../../Context/CustomerProvider';

const NewActivity = () => {
  const navigation = useNavigation();
  const date = moment();

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  const {selectedCustomerType, setSelectedCustomerType,selectedCustomer, setSelectedCustomer,showInput, setShowInput,showCustomerFields, setShowCustomerFields} = useContext(CustomerContext);

  // console.log('user details', JSON.stringify(userDetails, null, 2));

  // ======= date========
  const [startDate, setStartDate] = useState(new Date());

  // console.log('start date', startDate.toLocaleDateString());

  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // ======= Time ========

  const defaultStartTime = new Date();
  defaultStartTime.setHours(9, 0, 0, 0);

  const defaultEndTime = new Date();
  defaultEndTime.setHours(18, 0, 0, 0);

  const [fromTime, setFromTime] = useState(defaultStartTime); // State for selected time
  // console.log('from time', fromTime.toLocaleTimeString());

  const [showTimePicker, setShowTimePicker] = useState(false); // State for time picker visibility

  // const [toTime, setToTime] = useState(defaultEndTime); // State for selected time
  // const [showToTimePicker, setShowToTimePicker] = useState(false); // State for time picker visibility





  // const [selectedCustomerType, setSelectedCustomerType] = useState('Default');

  // console.log('selected customer type',JSON.stringify(selectedCustomerType, null, 2));
    
  // const [selectedCustomer, setSelectedCustomer] = useState('');
  // console.log('selected cusotmer', JSON.stringify(selectedCustomer, null, 2));

  // ===================
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // const [showInput, setShowInput] = useState(false);
  // const [showCustomerFields, setShowCustomerFields] = useState(false);





  // =============
  // const [checked, setChecked] = useState(null); // Initialize checked state as null

  // console.log('radio button', checked);

  // const [status, setStatus] = useState(null); // Initialize status state as null
  // const [notes, setNotes] = useState('');

  const [data, setData] = React.useState([]);

  // today
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState(null);

  const [isClicked, setClicked] = useState(false);

  // =================================

  // const [activityId, setActivityId] = useState(null);
  // const [activityBy, setActivityBy] = useState(null);
  // const [deviceActivityId, setDeviceActivityId] = useState('');
  // const localDateTime = date.format('M/D/YYYY hh:mm:ss');

  // const activityDate = startDate.format('M/D/YYYY')

  // useEffect(() => {

  //   // Update the time every second
  //   const interval = setInterval(() => {
  //     const updatedTime = moment().format('M/D/YYYY hh:mm:ss');
  //     setDeviceTime(updatedTime);
  //   }, 1000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, []);

  // const handleNewActivity = () => {
  //   // const value = [
  //   //   {
  //   //     ActivityID: 1,
  //   //     ActivityBy: userDetails?.empId,
  //   //     DeviceActivityID: deviceActivityId,
  //   //     DeviceSystemDateTime: localDateTime,
  //   //     CustomerId:
  //   //       selectedCustomerType === 'Default'
  //   //         ? selectedCustomerType
  //   //         : selectedCustomer.value,
  //   //     ActivityType: checked,
  //   //     Notes: notes,
  //   //     ActivityStartTime: `${formatDate(startDate)} ${moment(fromTime).format(
  //   //       'h:mm:ss',
  //   //     )}`,
  //   //     ActivityEndTime: localDateTime,
  //   //     AppointmentNo: '',
  //   //     TransferEmployeeId: '',
  //   //     EntryBy: userDetails?.empId,
  //   //     EntryDate: localDateTime,
  //   //   },
  //   // ];

  //   const value = {
  //     CustomerId:
  //       selectedCustomerType === 'Default'
  //         ? selectedCustomerType
  //         : selectedCustomer.value,

  //     ActivityStartTime: `${formatDate(startDate)} ${moment(fromTime).format(
  //       'h:mm:ss',
  //     )}`,
  //   };

  //   navigation.navigate('All Activity', {data: value});

  //   // console.log('this is new activity data', JSON.stringify(value, null, 2));
  // };






  const handleNewActivity = () => {
    
    if (selectedCustomerType === '1') {
      // If customer type is "New", check if any required fields are empty
      if (!customerName || !customerMobile || !customerEmail || !customerAddress) {
        // If any required field is empty, show an alert message
        Alert.alert('Please fill out all fields.');        
        return; // Stop further execution
      }
    }
  
    // If all fields are filled, proceed to the next screen
    const value = {
      CustomerId:
        selectedCustomerType === 'Default'
          ? selectedCustomerType
          : selectedCustomer.value,
      ActivityStartTime: `${formatDate(startDate)} ${moment(fromTime).format(
        'h:mm:ss',
      )}`,
    };
  
    navigation.navigate('All Activity', {data: value});
  };







  // ======================

  // const handleRadioPress = value => {
  //   setChecked(value);
  //   if (value === '1') {
  //     setStatus('Approved');
  //   } else if (value === '2') {
  //     setStatus('Rejected');
  //     navigation.navigate('Order Delivery');
  //   } else if (value === '3') {
  //     setStatus('Rejected');
  //     navigation.navigate('Appointment Screen');
  //   }
  // };

  const currentDate = moment().format('DD/MM/YYYY');

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

      // setStartDate(moment(selectedDate).format('DD/MM/YYYY'));

      // if (selectedDate > endDate) {
      //   setError('select correct date');
      // } else {
      //   setError('');
      // }
    }
  };

  const handleFromTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');

    if (selectedTime) {
      setFromTime(selectedTime);
      // if (selectedTime > toTime) {
      //   setTimeError('select correct time');
      // } else {
      //   setTimeError('');
      // }
    }
  };

  // const handleValueChange = value => {
  //   console.log('value', value);

  //   if (value === '1') {
  //     setShowInput(true);
  //     setShowCustomerFields(true); // Additional state to determine which customer fields to show
  //   } else if (value === '2') {
  //     setShowInput(true);
  //     setShowCustomerFields(false);
  //   } else {
  //     setShowInput(false);
  //     setShowCustomerFields(false);
  //   }
  // };


//==========kawser working on this problem ======================


const handleValueChange = value => {
  if (value === '1') {
    setShowInput(true);
    setShowCustomerFields(true);
    // Clear customer information fields
    setCustomerName('');
    setCustomerEmail('');
    setCustomerMobile('');
    setCustomerAddress('');
    // Clear selected customer state
    setSelectedCustomer(null);
  } else if (value === '2') {
    setShowInput(true);
    setShowCustomerFields(false);
    // Clear selected customer state
    setSelectedCustomer(null);
  } else {
    setShowInput(false);
    setShowCustomerFields(false);
    // Clear selected customer state
    setSelectedCustomer(null);
  }
};


// const handleValueChange = value => {
//   if (value === '1') {
//     setShowInput(true);
//     setShowCustomerFields(true);
//     // Clear customer information fields
//     setCustomerName('');
//     setCustomerEmail('');
//     setCustomerMobile('');+
//     setCustomerAddress('');
//     // Clear selected customer state
//     setSelectedCustomer(null);
//   } else if (value === '2') {
//     setShowInput(true);
//     setShowCustomerFields(false);
//     // Clear customer information fields
//     setCustomerName('');
//     setCustomerEmail('');
//     setCustomerMobile('');
//     setCustomerAddress('');
//     // Clear selected customer state
//     setSelectedCustomer(null);
//   } else {
//     setShowInput(false);
//     setShowCustomerFields(false);
//     // Clear customer information fields
//     setCustomerName('');
//     setCustomerEmail('');
//     setCustomerMobile('');
//     setCustomerAddress('');
//     // Clear selected customer state
//     setSelectedCustomer(null);
//   }
// };



//======================





  // customer list api
  const handleCustomerList = async result => {
    try {
      const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
      const response = await fetch(
        `${Base_Url}/api/Master/CheckCustomerApi?customerNameOrNumber=${searchText}`,
        // `${Base_Url}/api/Master/CheckCustomerApi?customerNameOrNumber=01713376375`,
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: authHeader,
          },
        },
      );
      const jsonData = await response.json();

      // console.log('final data', JSON.stringify(jsonData, null, 2));


      
      // const newArray = jsonData?.data.map((item) => {
      //   return {key: item.customerId, value: item.customerName}
      // })

      // const transformedData = jsonData.map(entry => ({
      //   key: entry.customerId,
      //   value: entry.customerName,
      // }));

      const transformedData = jsonData.map(entry => ({
        label: entry.customerName,
        value: entry.customerId,
        number: entry.contactNumberOne,
        email: entry.email,
        address: entry.customerAddress,
      }));

      // console.log('transformed data', JSON.stringify(transformedData, null, 2));

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    handleCustomerList();
  }, [searchText]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //    if (selectedCustomerType === 1) {
  //     setCustomerMobile(""),
  //     setCustomerEmail('')
  //    }

  //   }, [])
  // );

  // create new customer api calling

  const handleCreateNewCustomer = async () => {
      // Check if any required fields are empty
  if (!customerName || !customerMobile || !customerEmail || !customerAddress) {
    // If any required field is empty, show an alert message
    Alert.alert('Please fill out all fields');
    return; // Stop further execution
  }


    try {
      const requestData = {
        Name: customerName,
        PhoneNo: customerMobile,
        Email: customerEmail,
        Address: customerAddress,
        EntryBy: userDetails?.empId.toString(),
      };

      console.log(
        'Posting new customer data:',
        JSON.stringify(requestData, null, 2),
      );

      const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);

      const response = await fetch(`${Base_Url}/api/Master/CreateCustomerApi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      console.log('API Response:', JSON.stringify(result, null, 2));
      // setOutput(result);
      ToastAndroid.show(result.status, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={customStyle.container}>
      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginBottom: 55}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            {/* Activity No: {deviceActivityId} */}
            Start Activity
          </Text>
        </View>

        {/* Date section */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingHorizontal: 15,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Activity Date</Text>

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

          {/* time section */}
          <View>
            <Text style={styles.label}>Time</Text>

            {/* <TouchableWithoutFeedback onPress={showFromTimepicker}>
                  <View style={{marginTop: 10, width: 100}}>
                    <View style={styles.labelContainer}>
                      <Text style={{color: 'gray'}}>HH:MM</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: 'gray',
                          letterSpacing: 1,
                        }}>

                        {fromTime.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback> */}

            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.TimeButtonContainer}>
              <Icon name="clock" size={20} style={styles.icon} />
              <Text style={styles.dateText}>
                {/* {fromTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })} */}
                {formatTime(fromTime)}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromTime}
                display="spinner" // Set display to "spinner" for seconds
                mode="time" // Set mode to "time" for time picker
                onChange={handleFromTimeChange}
              />
            )}
          </View>
        </View>

        {/* customer type */}

        <View>
          <Text style={styles.label}>Customer Type</Text>

          <View style={styles.dropdownPicker}>
            <Picker
              selectedValue={selectedCustomerType}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCustomerType(itemValue);
                handleValueChange(itemValue);

                // clear filed when select 'New'
                if (itemValue === '1') {
                  // setSelectedCustomer('');
                  // setSearchText('');
                  // setValue(null);
                  setCustomerMobile(''), 
                  setCustomerEmail('');
                }
              }}
              style={{color: 'gray'}}
              dropdownIconColor="gray">
              <Picker.Item label="Default" value="Default" />
              <Picker.Item label="New" value="1" />
              <Picker.Item label="Existing" value="2" />
            </Picker>
          </View>
        </View>

        {/* ====================================== */}

        {showInput && (
          <>
            {selectedCustomerType === '2' && (
              <View>
                <Text style={styles.label}>Customer</Text>

                {/* <Dropdown
                  mode="default"
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={{color: 'red'}}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Customer"
                  searchPlaceholder="Search..."
                  value={selectedCustomer}
                  onChangeText={text => {
                    setSearchText(text);
                    console.log('Search Text:', text);
                  }}
                  onChange={item => {
                    console.log('itemmmmm', item);
                    setSelectedCustomer(item.value);

                    // setSearchText(item.number);

                    // setSearchText(item);

                    setValue(item);

                    setCustomerMobile(item?.number);
                    setCustomerEmail(item.email);
                    setCustomerAddress(item.address);
                  }}
                /> */}

                {/* customer dropdown */}

                <View>
                  <TouchableOpacity
                    style={styles.dropdownSelector}
                    // onPress={() => setClicked(!isClicked)}
                    onPress={() => {
                      setSearchText('');
                      setClicked(!isClicked);
                    }}>
                    <Text style={{color: 'gray'}}>
                      {selectedCustomer
                        ? `${selectedCustomer.label}`
                        : 'Select an item'}
                    </Text>
                    <Icon name="sort-down" size={15} color="gray" />
                  </TouchableOpacity>

                  <Modal
                    isVisible={isClicked}
                    onBackdropPress={() => setClicked(false)}>
                    <View style={styles.dropdownArea}>
                      <TextInput
                        placeholder="search"
                        style={styles.searchInput}
                        onChangeText={text => setSearchText(text)}
                        placeholderTextColor="gray"
                      />
                      <FlatList
                        // data={filteredData}
                        data={data}
                        // sortedData
                        renderItem={({item, index}) => {
                          return (
                            <TouchableOpacity
                              style={{
                                width: '85%',
                                alignSelf: 'center',
                                height: 50,
                                justifyContent: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#8e8e8e',
                              }}
                              onPress={() => {
                                setSelectedCustomer(item);
                                setClicked(!isClicked);
                              }}>
                              <Text style={{fontWeight: '600', color: 'gray'}}>
                                {item.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            )}

            {showCustomerFields && selectedCustomerType === '1' && (
              //  {/* customer name */}
              <View style={styles.leaveContent}>
                <Text style={styles.label}>Customer Name</Text>
                <View style={{flex: 1}}>
                  <TextInput
                    multiline
                    numberOfLines={4}
                    style={[styles.input]}
                    placeholder="Name"
                    placeholderTextColor="gray"
                    onChangeText={text => setCustomerName(text)}
                    value={customerName}
                  />
                </View>
              </View>
            )}

            {/* customer mobile */}

            <View style={styles.leaveContent}>
              <Text style={styles.label}>Customer Mobile</Text>
              <View style={{flex: 1}}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={[styles.input]}
                  placeholder="Mobile"
                  placeholderTextColor="gray"
                  onChangeText={text => setCustomerMobile(text)}
                  value={
                    selectedCustomer ? selectedCustomer.number : customerMobile
                  }
                />
              </View>
            </View>

            {/* customer email */}
            <View style={styles.leaveContent}>
              <Text style={styles.label}>Customer Email</Text>
              <View style={{flex: 1}}>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={[
                    styles.input,
                    {
                      backgroundColor:
                        selectedCustomerType === '2' ? '#dee2e6' : 'white',
                    },
                  ]}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  onChangeText={text => setCustomerEmail(text)}
                  value={
                    selectedCustomer ? selectedCustomer.email : customerEmail
                  }
                  editable={selectedCustomerType === '1' ? true : false}
                />
              </View>
            </View>

            {/* customer address */}
            <View style={styles.leaveContent}>
              <Text style={styles.label}>Customer Address</Text>
              <View style={{flex: 1}}>
                <TextInput
                  // multiline
                  // numberOfLines={4}
                  style={[
                    styles.input,
                    {
                      backgroundColor:
                        selectedCustomerType === '2' ? '#dee2e6' : 'white',
                    },
                  ]}
                  placeholder="Address"
                  placeholderTextColor="gray"
                  onChangeText={text => setCustomerAddress(text)}
                  value={
                    selectedCustomer
                      ? selectedCustomer.address
                      : customerAddress
                  }
                  editable={selectedCustomerType === '1' ? true : false}
                />
              </View>
            </View>

            {/* customer note */}
            {showCustomerFields && selectedCustomerType === '1' && (
              <View style={{alignSelf: 'flex-end', marginVertical: 10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreateNewCustomer}>
                  <Text
                    style={{color: '#FFFFFF', fontWeight: '700', fontSize: 22}}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* radio button */}

        {/* <View>
          <Text style={styles.label}>Activity</Text>

          <View style={styles.radioBtn}>
            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="1"
                color="green"
                status={checked === '1' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioPress('1')} // Call handleRadioPress with the value 'first'
              />
              <Text style={{color: 'black'}}>New Activity</Text>
            </View>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="2"
                color="tomato"
                status={checked === '2' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioPress('2')} // Call handleRadioPress with the value 'second'
              />
              <Text style={{color: 'black'}}>For Delivery</Text>
            </View>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="3"
                color="blue"
                status={checked === '3' ? 'checked' : 'unchecked'}
                onPress={() => handleRadioPress('3')} // Call handleRadioPress with the value 'second'
              />
              <Text style={{color: 'black'}}>Appoinment</Text>
            </View>
          </View>
        </View> */}

        {/* Notes */}

        {/* <View style={styles.leaveContent}>
          <Text style={styles.label}>Notes</Text>
          <View style={{flex: 1}}>
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Write notes here"
              placeholderTextColor="gray"
              onChangeText={text => setNotes(text)}
              value={notes}
            />
          </View>
        </View> */}

        {/* button */}

        {/* <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Activity Check')}
            onPress={handleNewActivity}>
            <Image
              style={{width: 65, height: 65, resizeMode: 'contain'}}
              source={require('../../../assets/homeScreen/next-button.png')}
            />
          </TouchableOpacity>
        </View> */}

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
              <Text style={{color: 'red', fontWeight: '700'}}>Cancel</Text>
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
              onPress={handleNewActivity}>
              <Text style={{color: '#04C1AA', fontWeight: '700'}}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewActivity;

const styles = StyleSheet.create({
  DayButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    // padding: 10,
    height: 45,
    borderRadius: 5,
    width: 130,
    // width: "80%",
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0B87AC',
    // flex:1,
  },
  TimeButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    // padding: 10,
    height: 45,
    borderRadius: 5,
    width: 130,
    // width: "80%",
    justifyContent: 'center',
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

  dropdownPicker: {
    borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    height: 45,
    // backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },

  mainContainer: {
    paddingHorizontal: 10,
    marginBottom: 50,
  },

  // radio button

  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 15,
    flexWrap: 'wrap',
  },

  radioBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    // justifyContent: 'center',
    // flex:1,
    // borderWidth:1,
    // width:"50%",

    // alignSelf:"center"
  },

  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,
    paddingHorizontal: 15,
    color: 'gray',

    paddingLeft: 10,
    // flex: 1,
  },

  // ================

  dropdownSelector: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#0B87AC',
    display: 'flex',
    flexDirection: 'row',
    // alignItems:"center",
    justifyContent: 'space-between',
  },

  dropdownArea: {
    width: '90%',
    height: '50%',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    zIndex: 200,
  },
  searchInput: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
    color: 'gray',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
    gap: 5,
  },

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#2FD790',
    elevation: 5,
    // flex:1,
  },
});
