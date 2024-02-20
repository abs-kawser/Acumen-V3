import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  deleteAppoinmetData,
  getAppoinmetData,
} from '../../Database/AppointmentTable';
import {
  deleteAllActivityData,
  getActivityData,
  getJoinedData,
  getNewActivityByDeviceActivityId,
} from '../../Database/NewActivityTable';
import {
  deleteActivityItemData,
  getActivityItemData,
  getActivityItemsByDeviceActivityId,
} from '../../Database/ActivityItemsTable';
import moment from 'moment';
import base64 from 'base-64';
import {
  deleteSpecificationData,
  getSpecificationData,
  getSpecificationDataByDeviceActivityId,
  getSpecificationsByDeviceActivityId,
} from '../../Database/SpecificationTable';
import {Base_Url, PASSWORD, USERNAME} from '../../../variable';
import { getTimeTrackerItemsByDeviceActivityId } from '../../Database/TimeTrackerTable';

const ActivitySummary = ({route}) => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();


  const {deviceId}  = route.params;

console.log("device id from activity summary",deviceId)

  // Convert to Bangladeshi time (Asia/Dhaka timezone)
  // const utcDateTime = moment.utc();
  // const bangladeshiDateTime = utcDateTime
  //   .tz('Asia/Dhaka')
  //   .format('YYYY-MM-DDTHH:mm:ss');
  // console.log('this is date time', bangladeshiDateTime);

  const DeviceActivityId = deviceId;


// useEffect(() => {
//   getSpecificationsByDeviceActivityId(DeviceActivityId)
// }, [])






// useEffect(() => {
//   const deviceId = DeviceActivityId; 
//   getNewActivityByDeviceActivityId(deviceId, (newActivityItems) => {
//     console.log('New Activity Items:', newActivityItems);

//     // Do something with the retrieved data
//   });
// }, [isFocused,DeviceActivityId])








  // ==============
  const [appointmentData, setAppointmentData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [activityItem, setActivityItem] = useState([]);
  const [activitySpecs, setActivitySpecs] = useState([]);
  const [activityTimeTrack, setActivityTimeTrack] = useState([]);

  // console.log(
  //   'this is saved activity data 2222',
  //   JSON.stringify(activityData, null, 2),
  // );

  useEffect(() => {
    // initAppointmentTable();
    getData();
    // deleteData()
    // deleteAppoinmetData();

    // getJoinedData();
  }, [isFocused]);

  const getData = () => {
    getAppoinmetData(item => setAppointmentData(item));


    // getActivityData(item => setActivityData(item));
    getNewActivityByDeviceActivityId(deviceId , (item) => {setActivityData(item)} )


    // getActivityItemData(item => setActivityItem(item));
    getActivityItemsByDeviceActivityId(deviceId , (item) => {setActivityItem(item)} )

    // getSpecificationData(item => setActivitySpecs(item));
    getSpecificationDataByDeviceActivityId(deviceId , (item) => {setActivitySpecs(item)} )


    getTimeTrackerItemsByDeviceActivityId(deviceId , (item) => {setActivityTimeTrack(item)} )
  };


// working code

  // const getData = () => {
  //   getAppoinmetData(item => setAppointmentData(item));
  //   getActivityData(item => setActivityData(item));
  //   getActivityItemData(item => setActivityItem(item));
  //   getSpecificationData(item => setActivitySpecs(item));
  // };


  const appoint = {
    CustomerAppointmentDTOList: appointmentData,
  };

  // console.log(
  //   'this is saved appointment data',
  //   JSON.stringify(appoint, null, 2),
  // );

  const apiResponseData = activityData;

  // Remove square brackets and get the JSON object
  const jsonObject = apiResponseData[0];

  const resultObject = {
    ...jsonObject,
    SalesPersonActivityItemDetailsDTOList: activityItem,
    SalesPersonActivitySpecDetailsDTOList: activitySpecs,
    CustomerAppointmentDTOList: appointmentData,
    SalesPersonActivityTimeDetails:activityTimeTrack
  };

  console.log(
    'Total result ========== ',
    JSON.stringify(resultObject, null, 2),
  );

  // posting all data to api

  const handleSubmitData = async () => {
    // setIsLoader(true); // Start loading
    // setIsLoading(true)
    // const requestData = resultObject;
    // console.log('requuuuuuu', JSON.stringify(requestData, null, 2));

    const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
    const response = await fetch(
      `${Base_Url}/api/SalesPersonActivityApi/SalesPersonActivityCreateApi`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(resultObject),
        // body: requestData,
      },
    );

    const result = await response.text();
    // setIsLoader(false); // Stop loading
    console.log('this is final result', JSON.stringify(result, null, 2));

    if (result === 'Submit done') {
      Alert.alert(result);

      navigation.navigate('HomeScreen');

      deleteSpecificationData();
      deleteAllActivityData();
      deleteAppoinmetData();
      deleteActivityItemData();
    } else {
      Alert.alert('error not submit');
    }

    // if (result.status.isSuccess === true) {
    //   await AsyncStorage.setItem('userData', JSON.stringify(result));

    //   // extra data load and store when user login
    //   await handleShopTailor(result);
    //   await handleShopEmployeeList(result);
    //   await handleDesignTemplate(result);

    //   // setIsLoading(false)

    //   setIsLoggedIn(prevUserDetails => ({
    //     ...prevUserDetails,
    //     login: true,
    //     userDetails: result,
    //   }));

    //   // navigation.navigate('HomeScreen');

    //   ToastAndroid.show(
    //     result.status.isSuccess === true && 'Login Successfully',
    //     ToastAndroid.SHORT,
    //   );
    // } else {
    //   const errorMessage = 'Please insert correct user name and password';
    //   setError(errorMessage);
    // }
  };

  // ==============

  return (
    <>
      <ScrollView style={{flex: 1, padding: 10, backgroundColor: '#FFFFFF'}}>
        {/* ====== main header ====== */}
        {/* <View style={{alignSelf: 'center', marginVertical: 10}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            Activity Summary
          </Text>
        </View> */}

        {/* first section */}
        <View style={styles.first_container}>
          <View style={{marginBottom: 10}}>
            <Text style={[styles.first_header_text, {fontWeight: '700'}]}>
              Activity No: {resultObject.DeviceActivityId}
            </Text>
          </View>
          <Text style={styles.first_header_text}>Date: 20-11-2023</Text>
          <Text style={styles.first_header_text}>Customer Name: Unknown</Text>
          <Text style={styles.first_header_text}>
            Customer Address: Banani, Dhaka
          </Text>
          {/* <Text style={styles.first_header_text}>
            Sales Person: Ariyan Arif
          </Text> */}
        </View>

        {/*========= Items details ==============*/}
        <View style={styles.order_container}>
          <View style={{alignSelf: 'flex-start'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#6C6D6D'}}>
              Item Details
            </Text>
          </View>

          {/* ========================= Table section =========================== */}

          <View style={styles.wrapper}>
            {/* table container */}
            <View style={styles.table}>
              {/*========== table head ===========*/}

              <View style={styles.table_head}>
                {/* one single row */}
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Barcode</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Qty</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Sample</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Remarks</Text>
                </View>
              </View>

              {/*========== table body ==========*/}

              {resultObject.SalesPersonActivityItemDetailsDTOList.map(
                (item, index) => (
                  <View style={styles.table_body}>
                    {/* one single row */}
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>{item.Barcode}</Text>
                    </View>
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>{item.ItemQty}</Text>
                    </View>
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>{item.IsSample}</Text>
                    </View>
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>{item.Remarks}</Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          </View>
        </View>

        {/*=========== Specification Details ==============*/}

        <View style={styles.order_container}>
          <View style={{alignSelf: 'flex-start'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#6C6D6D'}}>
              Spec Details
            </Text>
          </View>

          {/* ========================= Table section =========================== */}

          <View style={styles.wrapper}>
            {/* table container */}
            <View style={styles.table}>
              {/*========== table head ===========*/}

              <View style={styles.table_head}>
                {/* one single row */}
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Name</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Qty</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Measurement</Text>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_captions}>Remarks</Text>
                </View>
              </View>

              {/*========== table body ==========*/}

              {resultObject.SalesPersonActivitySpecDetailsDTOList.map(
                (specDetail, index) => (
                  <View style={styles.table_body}>
                    {/* one single row */}
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}> {specDetail.Name}</Text>
                    </View>
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>
                        {specDetail.SpecQty}
                      </Text>
                    </View>
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>
                        {specDetail.Measurement}
                      </Text>
                    </View>
                    <View style={{width: '25%'}}>
                      <Text style={styles.table_data}>
                        {specDetail.Remarks}
                      </Text>
                    </View>
                  </View>
                ),
              )}
            </View>
          </View>
        </View>

        {/* ====== end section ========= */}

        <View style={styles.first_container}>
          {resultObject.CustomerAppointmentDTOList.map((cusApp, index) => (
            <View key={index}>
              <View style={{marginBottom: 10}}>
                <Text style={[styles.first_header_text, {fontWeight: '700'}]}>
                  Appoinment No: {cusApp.CustomerId}
                </Text>
              </View>
              <Text style={styles.first_header_text}>
                Customer Address: {cusApp.Address}
              </Text>
              <Text style={styles.first_header_text}>
                Appointment Date: {cusApp.AppointmentDate}
              </Text>
            </View>
          ))}
        </View>

        {/*======== button ========*/}

        <View style={{alignSelf: 'center', marginVertical: 30}}>
          <TouchableOpacity style={styles.button} onPress={handleSubmitData}>
            <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <View>
  <Text style={{color:"red"}}>{appointmentData.toString()}</Text>
</View> */}
    </>
  );
};

export default ActivitySummary;

const styles = StyleSheet.create({
  first_container: {
    // height:250,
    // backgroundColor: '#e9ecef', // f8f9fa e9ecef
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    // elevation:5
  },
  order_container: {
    marginVertical: 10,
    // elevation:5
  },

  item_container: {
    marginBottom: 100,
    flex: 1,
  },

  // fist section
  first_header_text: {
    fontSize: 18,
    // fontWeight: '600',
    color: '#000000',
  },

  // ============ Table design =============
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  table: {
    // margin: 15,
    marginTop: 10,
    // marginHorizontal: 5,
    // borderWidth: 1,
    borderColor: '#ced4da',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,

    // elevation: 2,
  },
  table_head: {
    flexDirection: 'row',
    // backgroundColor: '#BFE7F0',

    backgroundColor: '#e9ecef',
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
  },
  table_captions: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    // borderRightColor: '#000000',
    padding: 5,

    flex: 1,
    fontSize: 12,
  },

  table_body: {
    flexDirection: 'row',
    // backgroundColor: '#E2F6F8',

    // backgroundColor: '#e9ecef',
    backgroundColor: 'rgba(242, 242, 242, 0.7)',

    // padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
  },
  table_data: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 5,

    flex: 1,
    // flexWrap:"wrap"
  },

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

  //   ===================

  tableInput: {
    textAlign: 'center',
    // borderRightWidth: 1,
    padding: 0,
    color: 'black',
    // borderColor: '#ced4da',
    backgroundColor: '#ffffff',
    margin: 2,
    height: 20,
    borderRadius: 15,
  },
});
