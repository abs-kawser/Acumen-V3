import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import customStyle from '../../Styles/commonStyle';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment-timezone';

const Tailoring = () => {
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

{/*============== form ============= */}
      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginVertical: 10}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            Tailoring Status
          </Text>
        </View>

        {/* item search */}
        <View style={{marginTop: 5}}>
          <Text style={styles.label}>Sales Order ID</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              borderColor: '#0B87AC',
            }}>
            <TextInput
              // style={{ flex: 1 }}
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Sales order Id"
              placeholderTextColor="gray"
              // Additional TextInput props can be added here
            />
            <TouchableOpacity style={{}}>
              <Image
                source={require('../../../assets/homeScreen/search2.png')} // Replace with the path to your icon
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 15,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* customer */}

        <View>
          <Text style={styles.label}>Customer</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              borderColor: '#0B87AC',
            }}>
            <TextInput
              // style={{ flex: 1 }}
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="customer"
              placeholderTextColor="gray"
              // Additional TextInput props can be added here
            />
            <TouchableOpacity style={{}}>
              <Image
                source={require('../../../assets/homeScreen/search2.png')} // Replace with the path to your icon
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 15,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* sales order date */}

        <View>
          <Text style={styles.label}>From</Text>

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
          <Text style={styles.label}>To</Text>

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

        {/* button */}

        <View style={{alignSelf: 'flex-end', marginVertical: 20}}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 22}}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      {/*============== table ================*/}
      <View style={styles.wrapper}>

        <View>
          <Text style={{color:"#000000",fontSize:15,fontWeight:"700"}}>Tailoring List</Text>
        </View>

        {/* table container */}
        <View style={styles.table}>
          {/*========== table head ===========*/}

          <View style={styles.table_head}>
            {/* one single row */}
            <View style={{width: '33.3%'}}>
              <Text style={styles.table_captions}>Name</Text>
            </View>
            <View style={{width: '33.3%'}}>
              <Text style={styles.table_captions}>Qty</Text>
            </View>
           
            <View style={{width: '33.3%'}}>
              <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                Status
              </Text>
            </View>
          </View>

          {/*========== table body ==========*/}

          <View style={styles.table_body}>
            {/* one single row */}
            <View style={{width: '33.3%'}}>
              <Text style={styles.table_data}>Curtain mc</Text>
            </View>
            <View style={{width: '33.3%'}}>
              <Text style={styles.table_data}>14</Text>
            </View>
            
            <View style={{width: '33.3%'}}>
              <Text style={[styles.table_data, {borderRightWidth: 0,color:"#03B11F"}]}>Ready</Text>
            </View>
          </View>

          <View style={styles.table_body}>
            {/* one single row */}
            <View style={{width: '33.3%'}}>
              <Text style={styles.table_data}>Cover</Text>
            </View>
            <View style={{width: '33.3%'}}>
              <Text style={styles.table_data}>12</Text>
            </View>
            
            <View style={{width: '33.3%'}}>
              <Text style={[styles.table_data, {borderRightWidth: 0,color:"#DE3A3D"}]}>Pending</Text>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

export default Tailoring;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    // marginVertical:15
  },
  input: {
    width: '100%',
    height: 45,
    // borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,
    // paddingHorizontal: 15,
    color: 'gray',
    flex: 1,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    fontWeight: '700',
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

  // button

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#00a6fb',
    elevation: 5,
    // flex:1,
  },


  // ============ Table design =============
  wrapper: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom:70,
    marginTop:30,
  },
  table: {
    // margin: 15,


    marginTop: 10,
    marginHorizontal: 5,
    // borderWidth: 1,
    borderColor: '#ced4da',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  table_head: {
    flexDirection: 'row',
    backgroundColor: '#BFE7F0',
  },
  table_captions: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 8,
  },

  table_body: {
    flexDirection: 'row',
    backgroundColor: '#E2F6F8',
    // padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
  },
  table_data: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 8,
  },
});
