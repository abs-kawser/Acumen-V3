import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import customStyle from '../../Styles/commonStyle';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {useCameraPermission} from 'react-native-vision-camera';
import Modal from 'react-native-modal';
import CameraComponent from '../../Components/CameraComponent';
import {useToast} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications';
import moment from 'moment';
import {
  deleteActivityItem,
  getActivityItemData,
  getActivityItemsByDeviceActivityId,
  initActivityItemDatabase,
  insertActivityItem,
} from '../../Database/ActivityItemsTable';
// import {initActivityItemDatabase} from '../../Database/NewActivityTable';
import {db} from '../../Database/MainDatabase';

const ActivityItems = ({route}) => {
  const navigation = useNavigation();

  const {devID}  = route.params;

  // const date = new Date();
  // const localTime = date.toISOString()

  // console.log("this is date",localTime)

  const date = moment();
  const localDateTime = date.format('MM/DD/YYYY hh:mm:ss');

  const utcDateTime = moment.utc();
  const bdDateTime = utcDateTime
    .tz('Asia/Dhaka')
    .format('YYYY-MM-DDTHH:mm:ss');
 

  // console.log(localDateTime);

  // toast message
  const toast = useToast();

  const toastRef = useRef();
  const hasScannedRef = useRef(false);

  // camera permission
  const {hasPermission, requestPermission} = useCameraPermission();
  const [barcode, setBarcode] = useState(null);
  const [barcodeData, setBarcodeData] = useState([]);
  const [qty, setQty] = useState(null);
  const [remarks, setRemarks] = useState(null);

  // console.log('this is barcode data', JSON.stringify(barcodeData, null, 2));

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const [blinkLine, setBlinkLine] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

  const [tableData, setTableData] = useState([]);

  const [saveData, setSavedData] = useState([]);

  // console.log("this is table data",JSON.stringify(tableData?.Barcode,null,2))

  useEffect(() => {
    initActivityItemDatabase();
    getData();
  }, []);

  const addBarcodeToTable = barcode => {
    const newData = {
      Barcode: barcode,
      ItemQty: qty,
      IsSample: 0,
      SampleDeliveryTime: bdDateTime,
      Remarks: remarks,
      DeviceSystemDateTime: bdDateTime,
      DeviceActivityId:devID
    };

    setTableData(prevData => [...prevData, newData]);
  };

  // =======table delete==========
  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'DROP TABLE IF EXISTS activity_item;',
  //       [],
  //       (_, result) => {
  //         console.log('Table deleted successfully');
  //       },
  //       error => {
  //         console.error('Error deleting table:', error);
  //       },
  //     );
  //   });
  // }, []);

  // const handleSaveButtonClick = () => {
  //   console.log('Table Data:', JSON.stringify(tableData, null, 2));

  //   insertActivityItem(tableData, success => {
  //     if (success) {
  //       Alert.alert('Data inserted successfully');
  //       // getData();

  //       // Reset tableData after successful insertion
  //     // setTableData([]);
  //     } else {
  //       Alert.alert('Failed to insert data');
  //     }
  //   });
  //   // Add your logic here to save the data or perform other actions
  // };


  const handleSaveButtonClick = () => {
    console.log('itemmmmmm Table Data:', JSON.stringify(tableData, null, 2));
  
    insertActivityItem(tableData, (success, dataAlreadyExists) => {
      if (success) {
        if (dataAlreadyExists) {
          Alert.alert('Data already exists in the database. Only new data inserted.');
        } else {
          Alert.alert('Data inserted successfully');
          navigation.goBack();
          getData();
        }
      } else {
        Alert.alert('Failed to insert data');
      }
    });
  };
  





  
  const getData = () => {
    // getActivityItemData(item =>{
    //   console.log('this is activity item data from sqlite', JSON.stringify(item,null,2));

    //   setSavedData(item);
    // }
    // );

    getActivityItemsByDeviceActivityId(devID , (item) => {setSavedData(item)} )
  };
  // =====================

  const handleQtyChange = (index, text) => {
    const updatedData = [...tableData];
    updatedData[index].ItemQty = text;
    setTableData(updatedData);
  };

  const handleRemarksChange = (index, text) => {
    const updatedData = [...tableData];
    updatedData[index].Remarks = text;
    setTableData(updatedData);
  };

  const handleCheckboxChange = (index, value) => {
    const updatedData = [...tableData];
    updatedData[index].sample = value ? 1 : 0; // Convert true to 1 and false to 0
    setTableData(updatedData);
  };

  const handleDeleteRow = index => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1); // Remove the row at the specified index
    setTableData(updatedData);
  };



  const handleDeleteRow2 = (itemId) => {
    deleteActivityItem(itemId, success => {
    if (success) {
      console.log('Item deleted successfully');
      getData();
    } else {
      console.log('Item not found or deletion failed');
    }
  });
  };

  






  // ===== barcode section =====

  const handleItemButtonPress = async () => {
    try {
      setIsRequestingPermission(true);
      const permission = await requestPermission();

      if (permission) {
        setIsCameraActive(true);
      } else {
        console.error('Camera permission denied');
      }
    } catch (error) {
      console.error('Error handling camera permission:', error);
    } finally {
      setIsRequestingPermission(false);
    }
  };

  // const handleCodeScanned = codes => {
  //   // Update the UI with the scanned barcode data

  //   if (codes[0].value.length === 13) {
  //     // Update the UI with the scanned barcode data
  //     const newBarcodeDataList = [...barcodeData, codes[0].value];
  //     setBarcodeData(newBarcodeDataList);

  //     const barcodeValue = codes[0].value;
  //     setBarcode(barcodeValue);
  //     setIsCameraActive(false);

  //     // Hide the Toast message when barcode length is 13
  //     //  ToastAndroid.hide();
  //   } else {
  //     // ToastAndroid.show("Barcode Doesn't Match", ToastAndroid.SHORT);
  //     toastRef.current.show("│█║ Barcode Doesn't Match ", {
  //       type: 'warning',
  //       duration: 1000,
  //     });
  //   }

  //   // setBarcodeData(newBarcodeDataList);

  //   hasScannedRef.current = true;

  //   // Close the camera after updating the UI
  //   // setIsCameraActive(false);

  //   // Reset the hasScannedRef variable to prevent multiple calls
  //   hasScannedRef.current = false;
  // };

  
  const handleCodeScanned = codes => {
    // Update the UI with the scanned barcode data
    if (codes[0].value.length === 13) {
      const barcodeValue = codes[0].value;
      setBarcode(barcodeValue);
      setIsCameraActive(false);
      addBarcodeToTable(barcodeValue);
    } else {
      toastRef.current.show("│█║ Barcode Doesn't Match ", {
        type: 'warning',
        duration: 1000,
      });
    }
    hasScannedRef.current = true;
    hasScannedRef.current = false;
  };

  const animateLine = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 198, // Adjust the distance the line should move down
          duration: 2000, // Adjust the duration of the downward animation
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(translateY, {
          toValue: 1, // Adjust the distance the line should move up
          duration: 2000, // Adjust the duration of the upward animation
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    animateLine();
  }, []);

  // blink line
  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setBlinkLine(blinkLine => !blinkLine);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={customStyle.container}>
      {/* Activity no */}
      <View style={{alignSelf: 'center', marginVertical: 10}}>
        <Text style={{color: '#000000', fontSize: 20}}>
          {/* Activity No: {deviceActivityId} */}
          Activity No: {devID}
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
          <Text>
            {' '}
            <Text style={{fontWeight: '800', color: 'black'}}>Date:</Text>{' '}
            20/01/2023
          </Text>
        </View>
        <View>
          <Text>
            <Text style={{fontWeight: '800', color: 'black'}}>Time:</Text> 10:35
            AM
          </Text>
        </View>
      </View>

      <View style={{alignSelf: 'center', paddingVertical: 20}}>
        <Text style={{fontWeight: '700', fontSize: 20, color: '#000000'}}>
          Item Info
        </Text>
      </View>

      {/* barcode scanner */}
      <View style={styles.barcode}>
        <Text style={styles.label}>Item Add</Text>
        {/* <View style={{flex: 1}}> */}

        <TouchableOpacity style={styles.input} onPress={handleItemButtonPress}>
          <View style={styles.buttonComponent}>
            <Text style={{color: 'black', fontSize: 15}}>
              {barcode ? barcode : 'Barcode'}
            </Text>

            <Image
              style={{width: 30, height: 30, resizeMode: 'contain'}}
              source={require('../../../assets/homeScreen/scan.png')}
            />
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </View>

      <View style={styles.wrapper}>
        {/* table container */}
        <View style={styles.table}>
          {/*========== table head ===========*/}

          <View style={styles.table_head}>
            {/* one single row */}
            <View style={{width: '15%'}}>
              <Text style={styles.table_captions}>Action</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={styles.table_captions}>Barcode</Text>
            </View>
            <View style={{width: '20%'}}>
              <Text style={styles.table_captions}>Qty</Text>
            </View>
            <View style={{width: '20%'}}>
              <Text style={styles.table_captions}>Sample</Text>
            </View>
            <View style={{width: '20%'}}>
              <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                Remarks
              </Text>
            </View>
          </View>

          {/*========== table body ==========*/}

          {tableData.map((rowData, index) => (
            <View>
              <View style={styles.table_body}>
                {/* one single row */}
                <View style={{width: '15%'}}>
                  {/* <Text style={styles.table_data}>delete</Text> */}
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                      borderRightWidth: 1,
                      borderRightColor: '#ced4da',
                    }}
                    onPress={() => handleDeleteRow(index)}>
                    <Image
                      style={{width: 20, height: 20, resizeMode: 'contain'}}
                      source={require('../../../assets/homeScreen/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_data}>{rowData.Barcode}</Text>
                </View>
                <View style={{width: '20%'}}>
                  {/* <Text style={styles.table_data}>18.5</Text> */}
                  <View
                    style={{
                      borderRightWidth: 1,
                      flex: 1,
                      borderColor: '#ced4da',
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={[styles.tableInput]}
                      keyboardType="numeric"
                      // value={qty}

                      // value={rowData.qty}

                      // onChangeText={text => setQty(text)}
                      onChangeText={text => handleQtyChange(index, text)}
                    />
                  </View>
                </View>
                <View style={{width: '20%'}}>
                  {/*===== checkbox ===== */}
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#ced4da',
                      flex: 1,
                      // alignContent: 'center',

                      justifyContent: 'center',
                    }}>
                    <CheckBox
                      style={{alignSelf: 'center'}}
                      // value={rowData.sample}
                      value={rowData.sample === 1}
                      onValueChange={value =>
                        handleCheckboxChange(index, value)
                      }
                      tintColors={{
                        true: 'black',
                        false: 'black',
                      }}
                    />
                  </View>
                </View>
                <View style={{width: '20%'}}>
                  {/* <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  m
                </Text> */}
                  <View
                    style={{
                      borderRightWidth: 1,
                      flex: 1,
                      borderColor: '#ced4da',
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={[styles.tableInput]}
                      // keyboardType="numeric"
                      // value={remarks}

                      // value={rowData.remarks}

                      // onChangeText={text => setRemarks(text)}
                      onChangeText={text => handleRemarksChange(index, text)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}




{/* ====================================== */}

{saveData.map((rowData, index) => (
            <View>
              <View style={styles.table_body}>
                {/* one single row */}
                <View style={{width: '15%'}}>
                  {/* <Text style={styles.table_data}>delete</Text> */}
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                      borderRightWidth: 1,
                      borderRightColor: '#ced4da',
                    }}
                    onPress={() => handleDeleteRow2(rowData.Item_id)}>
                    <Image
                      style={{width: 20, height: 20, resizeMode: 'contain'}}
                      source={require('../../../assets/homeScreen/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{width: '25%'}}>
                  <Text style={styles.table_data}>{rowData.Barcode}</Text>
                </View>
                <View style={{width: '20%'}}>
                  {/* <Text style={styles.table_data}>18.5</Text> */}
                  <View
                    style={{
                      borderRightWidth: 1,
                      flex: 1,
                      borderColor: '#ced4da',
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={[styles.tableInput]}
                      // keyboardType="numeric"
                      // value={qty}

                      value={rowData.ItemQty.toString()}

                      // onChangeText={text => setQty(text)}
                      onChangeText={text => handleQtyChange(index, text)}
                    />
                  </View>
                </View>
                <View style={{width: '20%'}}>
                  {/*===== checkbox ===== */}
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#ced4da',
                      flex: 1,
                      // alignContent: 'center',

                      justifyContent: 'center',
                    }}>
                    <CheckBox
                      style={{alignSelf: 'center'}}
                      value={rowData.IsSample}
                      // value={rowData.sample === 1}
                      onValueChange={value =>
                        handleCheckboxChange(index, value)
                      }
                      tintColors={{
                        true: 'black',
                        false: 'black',
                      }}
                    />
                  </View>
                </View>
                <View style={{width: '20%'}}>
                  {/* <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  m
                </Text> */}
                  <View
                    style={{
                      borderRightWidth: 1,
                      flex: 1,
                      borderColor: '#ced4da',
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={[styles.tableInput]}
                      // keyboardType="numeric"
                      // value={remarks}

                      value={rowData.Remarks}

                      // onChangeText={text => setRemarks(text)}
                      onChangeText={text => handleRemarksChange(index, text)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}


        </View>
      </View>

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
              // onPress={addBarcodeToTable}

            onPress={() => handleSaveButtonClick()}
            
            >

            <Text style={{color: '#04C1AA', fontWeight: '700'}}>
              Save & Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* camera */}

      {isCameraActive && (
        <Modal
          // animationType="fade"
          transparent={true} // Set to true to make the modal transparent
          visible={isCameraActive}
          onRequestClose={() => setIsCameraActive(false)}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            margin: 0,
            zIndex: 1000,
          }}>
          <CameraComponent
            isActive={isCameraActive}
            onCodeScanned={handleCodeScanned}
          />
          <View
            style={{
              position: 'absolute',
              borderWidth: 1,
              borderColor: 'red',
              width: 300,
              height: 300,
              // display:"flex",
              alignSelf: 'center',
              // display: blinkLine ? 'none' : 'flex',
              zIndex: 10,
            }}
          />
          {/* blinking line */}
          <View
            style={{
              width: 300,
              height: 1,
              borderRadius: 30,
              backgroundColor: 'yellow',
              display: blinkLine ? 'none' : 'flex',
              alignSelf: 'center',
            }}
          />
          {/* use for show toast into modal */}
          <Toast ref={toastRef} />
        </Modal>
      )}
    </ScrollView>
  );
};

export default ActivityItems;

const styles = StyleSheet.create({
  barcode: {
    paddingHorizontal: 10,
  },

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
    borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,
    paddingHorizontal: 15,
    color: 'black',
  },
  buttonComponent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  // ============ Table design =============
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  table: {
    // margin: 15,
    marginTop: 30,
    // marginHorizontal: 5,
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
    padding: 5,

    fontSize: 13,
    flex: 1,
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
    fontSize: 12,
    // textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 5,

    // justifyContent:"center",
    flex: 1,
    // alignItems:"center",
  },
  tableInput: {
    textAlign: 'center',
    // borderRightWidth: 1,
    padding: 0,
    color: 'black',
    // borderColor: '#ced4da',
    backgroundColor: '#ffffff',
    margin: 2,
    height: 25,
    borderRadius: 15,
  },
});
