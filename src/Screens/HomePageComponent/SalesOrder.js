import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import customStyle from '../../Styles/commonStyle';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment-timezone';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const SalesOrder = () => {
  const navigation = useNavigation();

  const {t} = useTranslation();

  const [leaveType, setLeaveType] = useState(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');

  // ======= date========
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // ============== date time formate===================

  const formatDate = date => {
    return moment(date).format('DD/MM/YYYY');
  };

  // handle start date change

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setError('select correct date');
      } else {
        setError('');
      }
    }
  };

  return (
    <ScrollView
      style={customStyle.container}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.mainContainer}>
        {/* top header text */}

        {/* <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            New Sales Order
          </Text>
        </View> */}

        {/* order type */}

        <View>
          <Text style={styles.label}>Order Type</Text>
          <View style={styles.dropdownPicker}>
            <Picker
              selectedValue={selectedLeaveType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLeaveType(itemValue)
              }
              style={{color: 'gray'}}
              dropdownIconColor="gray">
              <Picker.Item label="Cash" value="Cash" />
              {leaveType?.map((value, index) => (
                <Picker.Item
                  style={{fontSize: 12}}
                  key={index}
                  label={value.LeaveTypeName}
                  value={value.LeaveTypeName}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* sales order date */}

        <View>
          <Text style={styles.label}>Sales Order Date</Text>

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

        {/* shipping date */}

        <View>
          <Text style={styles.label}>Shipping Date</Text>

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

        {/* Delivery via */}

        <View style={styles.leaveContent}>
          <Text style={styles.label}>Delivery Via</Text>
          <View style={styles.dropdownPicker}>
            <TextInput
              // multiline
              // numberOfLines={4}
              style={[styles.input]}
              placeholder="Delivery"
              placeholderTextColor="gray"
              // onChangeText={text => setReason(text)}
              // value={reason}
            />
          </View>
        </View>

        {/* Sales Note */}

        <View style={styles.leaveContent}>
          <Text style={styles.label}>Sales Note</Text>
          <View style={styles.dropdownPicker}>
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Sales Note"
              placeholderTextColor="gray"
              // onChangeText={text => setReason(text)}
              // value={reason}
            />
          </View>
        </View>

        {/* Customer */}

        <View>
          <Text style={styles.label}>Customer</Text>
          <View style={styles.dropdownPicker}>
            <Picker
              selectedValue={selectedLeaveType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLeaveType(itemValue)
              }
              style={{color: 'gray'}}
              dropdownIconColor="gray">
              <Picker.Item label="Default" value="Default" />
              {leaveType?.map((value, index) => (
                <Picker.Item
                  style={{fontSize: 12}}
                  key={index}
                  label={value.LeaveTypeName}
                  value={value.LeaveTypeName}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* button */}

        <View style={{alignSelf: 'center', marginVertical: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Sales Order Search')}>
            <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
              Save & Next
              {/* {t('hello')} */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SalesOrder;

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
