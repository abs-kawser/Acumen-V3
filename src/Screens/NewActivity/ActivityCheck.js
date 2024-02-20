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

const ActivityCheck = () => {
  const navigation = useNavigation();

  // toast message
  const toast = useToast();

  const toastRef = useRef();

  // camera permission
  const {hasPermission, requestPermission} = useCameraPermission();
  const [barcode, setBarcode] = useState(null);
  const [barcodeData, setBarcodeData] = useState([]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const [blinkLine, setBlinkLine] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

  const [tableData, setTableData] = useState([
    {barcode: '123456789', qty: '10', sample: false},
    {barcode: '123456789', qty: '5', sample: false},
    // Add more rows as needed
  ]);

  const handleQtyChange = (index, value) => {
    const newData = [...tableData];
    newData[index].qty = value;
    setTableData(newData);
  };

  const handleCheckboxChange = (index, value) => {
    const newData = [...tableData];
    newData[index].sample = value;
    setTableData(newData);
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

  const handleCodeScanned = codes => {
    // Update the UI with the scanned barcode data

    console.log('this is barcode data', codes);

    if (codes[0].value.length === 13) {
      // Update the UI with the scanned barcode data
      const newBarcodeDataList = [...barcodeData, codes[0].value];
      setBarcodeData(newBarcodeDataList);

      const barcodeValue = codes[0].value;
      setBarcode(barcodeValue);
      setIsCameraActive(false);

      // Hide the Toast message when barcode length is 13
      //  ToastAndroid.hide();
    } else {
      // ToastAndroid.show("Barcode Doesn't Match", ToastAndroid.SHORT);
      toastRef.current.show("│█║ Barcode Doesn't Match ", {
        type: 'warning',
        duration: 1000,
      });
    }

    // setBarcodeData(newBarcodeDataList);

    hasScannedRef.current = true;

    // Close the camera after updating the UI
    // setIsCameraActive(false);

    // Reset the hasScannedRef variable to prevent multiple calls
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

  // =========== MAIN =============
  return (
    <ScrollView style={customStyle.container}>
      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20}}>
            Activity No: 10125554554
          </Text>
        </View>

        {/* barcode scanner */}
        <View style={styles.barcode}>
          <Text style={styles.label}>Item Add</Text>
          {/* <View style={{flex: 1}}> */}

          <TouchableOpacity
            style={styles.input}
            onPress={handleItemButtonPress}>
            <View style={styles.buttonComponent}>
              <Text style={{color: 'black', fontSize: 15}}>Item</Text>

              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../../../assets/homeScreen/scan.png')}
              />
            </View>
          </TouchableOpacity>
          {/* </View> */}
        </View>

        {/* table */}

        {/* <View style={styles.tableContainer}>
          {renderTableHeader()}
          {renderTableRows()}
        </View> */}

        {/* table 1 */}

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
                  }}>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/delete.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>12345678910</Text>
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
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
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
                    // onValueChange={value => handleCheckboxChange(index, value)}
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
                    keyboardType="numeric"
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
                  />
                </View>
              </View>
            </View>

            {/* <View style={styles.table_body}>
              <View style={{width: '30%'}}>
                <Text style={styles.table_data}>12345678910</Text>
              </View>
              <View style={{width: '30%'}}>
                <Text style={styles.table_data}>ITN001</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>18.5</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  m
                </Text>
              </View>
            </View> */}

            {/* <View style={styles.table_body}>
              
              <View style={{width: '30%'}}>
                <Text style={styles.table_data}>12345678910</Text>
              </View>
              <View style={{width: '30%'}}>
                <Text style={styles.table_data}>ITN001</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>18.5</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  m
                </Text>
              </View>
            </View> */}
          </View>
        </View>

        {/* specification */}
        <View style={{marginTop: 10, paddingHorizontal: 10}}>
          <Text style={styles.label}>Specification</Text>
          <View style={{flex: 1}}>
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Enter Specification"
              placeholderTextColor="black"
              //   onChangeText={text => setReason(text)}
              //   value={reason}
            />
          </View>
        </View>

        {/* table 2 */}

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
                <Text style={styles.table_captions}>Name</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_captions}>Qty</Text>
              </View>
              <View style={{width: '25%'}}>
                <Text style={styles.table_captions}>Measurement</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                  Remarks
                </Text>
              </View>
            </View>

            {/*========== table body ==========*/}

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
                  }}>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/delete.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>Yeasir Arafat</Text>
              </View>
              <View style={{width: '15%'}}>
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
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
                  />
                </View>
              </View>
              <View style={{width: '25%'}}>
                {/*===== checkbox ===== */}
                {/* <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#ced4da',
                    // flex: 1,
                    // alignContent: 'center',
                  }}>
                  <CheckBox
                    style={{alignSelf: 'center'}}
                    // value={rowData.sample}
                    // onValueChange={value => handleCheckboxChange(index, value)}
                    tintColors={{
                      true: 'black',
                      false: 'black',
                    }}
                  />
                </View> */}

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
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
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
                    keyboardType="numeric"
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* button */}

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            flexDirection: 'row',
            gap: 50,
            marginBottom: 50,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{width: 65, height: 65, resizeMode: 'contain'}}
              source={require('../../../assets/homeScreen/previous.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Activity Summary')}>
            <Image
              style={{width: 65, height: 65, resizeMode: 'contain'}}
              source={require('../../../assets/homeScreen/next-button.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* =============== */}

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

export default ActivityCheck;

const styles = StyleSheet.create({
  mainContainer: {
    // paddingHorizontal: 5,
  },

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

  //   table

  tableContainer: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
    marginVertical: 25,
    // margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C1C0B9',
  },

  tableRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C1C0B9',
    height: 30,
    backgroundColor: '#DEE7FD',
  },
  headerRow: {
    backgroundColor: '#739AFF8F',
    height: 30,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  cell: {
    textAlign: 'center',
    color: 'black',
  },
  tableInput: {
    textAlign: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 0,
    color: 'black',
    borderColor: 'gray',
  },

  checkboxContainer: {
    alignSelf: 'center',
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
