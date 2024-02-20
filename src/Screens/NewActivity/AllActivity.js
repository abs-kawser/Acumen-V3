import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import customStyle from '../../Styles/commonStyle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/AuthContext';
import moment from 'moment';
import {
  deleteUser,
  getActivityData,
  initDatabase,
  insertNewActivity,
} from '../../Database/NewActivityTable';
import {CustomerContext} from '../../Context/CustomerProvider';
import {
  getDraftData,
  initDraftDatabase,
  insertDraftItems,
} from '../../Database/DraftTable';
import {
  getTimeTrackerData,
  getTimeTrackerItemsByDeviceActivityId,
  initTimeTrackerDatabase,
  insertTimeTrackerItems,
} from '../../Database/TimeTrackerTable';
import { useToast } from 'react-native-toast-notifications';

const AllActivity = ({route}) => {
  const {data} = route.params;
  const toast = useToast();
  const {value} = route.params;

  const isFocused = useIsFocused()
  // console.log('device activity id', value.DeviceActivityId);

  // const startTime = data.ActivityStartTime;
  // const customerId = data.CustomerId;

  const navigation = useNavigation();

  const date = moment();
  const time = date.format('YYYY-MM-DD hh:mm:ss');

  const currentDate = date.format('YYYY-MM-DD hh:mm:ss');

  // Context api
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  const {
    selectedCustomerType,
    setSelectedCustomerType,
    selectedCustomer,
    setSelectedCustomer,
  } = useContext(CustomerContext);

  console.log(
    'this is customer type from context api',
    JSON.stringify(selectedCustomer, null, 2),
  );

  // hooks
  const [notes, setNotes] = useState(value ? value.Notes :'');
  const [deviceActivityId, setDeviceActivityId] = useState('');

  console.log("activity num ---- ",deviceActivityId)

  // const [notes2, setNotes2] = useState(value?.Notes);

  // const localDateTime = date.format('MM/DD/YYYY hh:mm:ss');

  const utcDateTime = moment.utc();
  const bdDateTime = utcDateTime.tz('Asia/Dhaka').format('YYYY-MM-DDTHH:mm:ss');

  // console.log("bd date",time)

  const [activityData, setActivityData] = useState(null);
  const [draftData, setDraftData] = useState(null);

  const [timeTracker, setTimeTracker] = useState(null);
  const [activityTime, setActivityTime] = useState(null);

  // console.log(
  //   'this is saved activity data',
  //   JSON.stringify(activityData, null, 2),
  // );


  console.log('this is saved draft data', JSON.stringify(draftData, null, 2));
  console.log(
    'this is saved Time-Tracker data === >',
    JSON.stringify(timeTracker, null, 2),
  );





  const [isComponentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    // This effect runs when the component is mounted
    if (!isComponentMounted) {
      // Call saveTimeTrackerData when the component is first mounted
      saveTimeTrackerData(time);
      setComponentMounted(true);
    }
  }, [isComponentMounted]);












  // generate device activity number
  useEffect(() => {
    // Function to generate a 10-digit random number
    const generateRandomNumber = () => {
      const id = userDetails.empId;
      const randomPart = Math.floor(Math.random() * 1000000000); // Generate a random 9-digit number

      const fullNumber = `${id}${randomPart.toString().padStart(9, '0')}`;
      setDeviceActivityId(fullNumber);
    };

    // Call the function to generate the random number when the component mounts

    // generateRandomNumber();

    if (value) {
      // 'value' is present, do not generate random number
      setDeviceActivityId(value.DeviceActivityId);
    } else {
      // 'value' is not present, generate random number
      generateRandomNumber();
    }
  }, []);

  // const value = [
  //   {
  //     // ActivityID: 1,
  //     ActivityBy: userDetails?.empId,
  //     DeviceActivityID: deviceActivityId,
  //     DeviceSystemDateTime: localDateTime,
  //     CustomerId: data?.CustomerId,
  //     // ActivityType: checked,
  //     Notes: notes,
  //     ActivityStartTime: data?.ActivityStartTime,
  //     ActivityEndTime: localDateTime,
  //     // AppointmentNo: '',
  //     // TransferEmployeeId: '',
  //     // EntryBy: userDetails?.empId,
  //     // EntryDate: localDateTime,
  //   },
  // ];

  // selectedCustomerType === 'Default'
  //         ? selectedCustomerType
  //         : selectedCustomer.value,

  const ActivityBy = userDetails?.empId;
  const DeviceActivityID = deviceActivityId;
  const DeviceSystemDateTime = bdDateTime;
  // const CustomerId = data?.CustomerId;
  const CustomerId =
    selectedCustomerType === 'Default'
      ? selectedCustomerType
      : selectedCustomer.value;

  const Notes = notes;
  // const ActivityStartTime = data?.ActivityStartTime;
  const ActivityStartTime = bdDateTime;
  const ActivityEndTime = bdDateTime;

  // for time tracker
  // const ActivityTime = activityTime;
  const WorkingStatus =value ? 2 : 1;
  const EntryBy = userDetails?.empId;
  const EntryDate = currentDate;

  // console.log('this is all activity data', JSON.stringify(value, null, 2));

  useEffect(() => {
    //=== activity ====
    initDatabase();
    getData();
    // deleteData()

    // === draft ====
    initDraftDatabase();
    getDraftallData();

    // ==== Time tracker =====
    initTimeTrackerDatabase();
    getTimeTrackerAllData();
  }, []);

  // for activity

  const saveData = () => {
    insertNewActivity(
      ActivityBy,
      DeviceActivityID,
      DeviceSystemDateTime,
      CustomerId,
      Notes,
      ActivityStartTime,
      ActivityEndTime,
      success => {
        if (success) {
          // Alert.alert('Data inserted successfully');
          toast.show('Data inserted successfully', {type: "success",duration: 2000,});
          getData();
          navigation.navigate('Activity Summary', {
            deviceId: value ? value.DeviceActivityId : deviceActivityId,
          });
        } else {
          // Alert.alert('Failed to insert data');
          toast.show('Failed to insert data', {type: "danger",duration: 2000,});
        }
      },
    );
  };

  const getData = () => {
    getActivityData(item => setActivityData(item));
  };

  // for draft

  const saveDraftData = () => {
    insertDraftItems(
      ActivityBy,
      DeviceActivityID,
      DeviceSystemDateTime,
      CustomerId,
      Notes,
      ActivityStartTime,
      ActivityEndTime,
      success => {
        if (success) {
          // Alert.alert('Draft Data inserted successfully');
          toast.show('Draft data inserted successfully', {type: "success",duration: 2000,});
          getDraftallData();
          navigation.navigate('HomeScreen');

          setActivityTime(time);

          // Call saveTimeTrackerData after saveDraftData
          saveTimeTrackerData(time);
        } else {
          Alert.alert('Failed to insert draft data');
          toast.show('Failed to insert draft data', {type: "danger",duration: 2000,});
        }
      },
    );
  };


  // for time tracker

  const saveTimeTrackerData = ActivityTime => {
    insertTimeTrackerItems(
      DeviceActivityID,
      ActivityTime,
      WorkingStatus,
      EntryBy,
      EntryDate,

      success => {
        if (success) {
          // Alert.alert('Time Tracker Data inserted successfully');
          toast.show('Pause data inserted successfully', {type: "success",duration: 1500,});
          getTimeTrackerAllData();
          // navigation.navigate('Draft');
        } else {
          // Alert.alert('Failed to insert Time Tracker data');
          toast.show('Failed to insert pause data', {type: "success",duration: 2000,});
        }
      },
    );
  };

  const getDraftallData = () => {
    getDraftData(item => setDraftData(item));
  };

  const getTimeTrackerAllData = () => {
    getTimeTrackerData(item => setTimeTracker(item));
  };

  // const deleteData = (id = 2) => {
  //   deleteUser(id, (success) => {
  //     if (success) {
  //       getData();
  //       Alert.alert('User deleted successfully');
  //     } else {
  //       Alert.alert('Please insert a valid user Id');
  //     }
  //   });
  // };




// ===================


// get specific item using device activity id


useEffect(() => {
  const deviceId = deviceActivityId; 
  getTimeTrackerItemsByDeviceActivityId(deviceId, (timeTrackerItems) => {
    console.log('Time Tracker specific Items:', JSON.stringify(timeTrackerItems,null,2));
    // Do something with the retrieved data
  });
}, [isFocused,deviceActivityId])



  return (
    <>
      <ScrollView style={customStyle.container}>
        <View style={styles.mainContainer}>
          {/* Activity no */}
          <View style={{alignSelf: 'center', marginVertical: 10}}>
            <Text style={{color: '#000000', fontSize: 20}}>
              Activity No: {deviceActivityId}
            </Text>
          </View>
          {/* date time */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View>
              <Text style={{fontWeight: '600', color: 'black'}}>
                {' '}
                <Text style={{fontWeight: '800', color: 'black'}}>
                  Date:
                </Text>{' '}
                20/01/2023
              </Text>
            </View>
            <View>
              <Text style={{fontWeight: '600', color: 'black'}}>
                <Text style={{fontWeight: '800', color: 'black'}}>Time:</Text>{' '}
                10:35 AM
              </Text>
            </View>
          </View>

          {/* Cards */}
          <View style={{marginTop: 20}}>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('Activity Customer')}>
                <View style={styles.inner}>
                  <Text style={{fontWeight: '700', color: '#000000'}}>
                    Customer
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('Activity Items',{devID: deviceActivityId,})}>
                <View style={styles.inner}>
                  <Text style={{fontWeight: '700', color: '#000000'}}>
                    Items
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() =>
                  navigation.navigate('Activity Specification', {
                    devID: deviceActivityId,
                  })
                }>
                <View style={styles.inner}>
                  <Text style={{fontWeight: '700', color: '#000000'}}>
                    Specification
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('Appointment Screen')}>
                <View style={styles.inner}>
                  <Text style={{fontWeight: '700', color: '#000000'}}>
                    Appoinment
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('Order Delivery')}>
                <View style={styles.inner}>
                  <Text style={{fontWeight: '700', color: '#000000'}}>
                    Sales Delivery
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Notes */}
          <View>
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
          </View>

          {/* Notes 2 */}

          {/* <View>
            <Text style={styles.label}>Notes</Text>
            <View style={{flex: 1}}>
              <TextInput
                multiline
                numberOfLines={4}
                style={[styles.input]}
                placeholder="Write notes here 2"
                placeholderTextColor="gray"
                onChangeText={text => setNotes2(text)}
                value={notes2}
              />
            </View>
          </View>



<Button title='see' onPress={()=>console.log("noteeee 2 ==== ",notes2)} /> */}

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
                onPress={() => saveDraftData()}

                // onPress={() => {
                //   saveDraftData();
                //   setActivityTime(time)
                // }}

                // onPress={() => {
                //   saveDraftData();
                //   saveTimeTrackerData();
                // }}
              >
                <Text style={{color: 'red', fontWeight: '700'}}>Pause</Text>
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
                // onPress={() => navigation.navigate('Activity Summary')}
                onPress={() => saveData()}

                //   onPress={handleNewActivity}
              >
                <Text style={{color: '#04C1AA', fontWeight: '700'}}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AllActivity;

const styles = StyleSheet.create({
  mainContainer: {
    // flex:1,
  },

  content: {
    // width: '100%',
    // height: '45%',
    // padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  cardContainer: {
    width: '33.3%',
    // height: '100%',
    padding: 5,
    height: 75,
    margin: 0,
  },

  inner: {
    flex: 1,
    backgroundColor: '#C5E9E4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 5,

    // elevation: 5,

    // padding:15,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    fontWeight: '700',
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
