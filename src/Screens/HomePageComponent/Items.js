import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  Animated,
  Easing,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import customStyle from '../../Styles/commonStyle';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useCameraPermission} from 'react-native-vision-camera';
import base64 from 'base-64';
import {useNavigation} from '@react-navigation/native';
import {Base_Url, PASSWORD, USERNAME} from '../../../variable';
import {AuthContext} from '../../Context/AuthContext';
import Modal from 'react-native-modal';
import CameraComponent from '../../Components/CameraComponent';

import {useToast} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications';

const Items = () => {
  const navigation = useNavigation();
  const hasScannedRef = useRef(false);

  // Context api
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  // toast message
  const toast = useToast();

  const toastRef = useRef();

  // camera permission
  const {hasPermission, requestPermission} = useCameraPermission();

  // barcode hook
  const [barcodeData, setBarcodeData] = useState([]);

  // main hooks
  const [itemName, setItemName] = useState('');
  const [barcode, setBarcode] = useState(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [blinkLine, setBlinkLine] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

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

  // latest code ============

  // const codeScanner = useCodeScanner({
  //   codeTypes: ['qr', 'ean-13', 'code-39'],
  //   onCodeScanned: codes => {
  //     // Update the UI with the scanned barcode data
  //     const newBarcodeDataList = [...barcodeData, codes[0].value];
  //     setBarcodeData(newBarcodeDataList);

  //     // extra test
  //     const barcodeValue = codes[0].value;
  //     setBarcode(barcodeValue);

  //     // ====== end ====

  //     hasScannedRef.current = true;

  //     // Close the camera after updating the UI
  //     setIsCameraActive(false);

  //     // Reset the hasScannedRef variable to prevent multiple calls
  //     hasScannedRef.current = false;
  //   },
  // });

  // const handleItemButtonPress = async () => {
  //   try {
  //     // Check if the app has camera permission
  //     const permission = await requestPermission();

  //     if (permission) {
  //       setIsCameraActive(true);
  //     } else {
  //       console.error('Camera permission denied');
  //     }
  //   } catch (error) {
  //     console.error('Error handling camera permission:', error);
  //   }
  // };

  // ====== latest code end =======

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

  // ============ api calling ===========

  const handleItemStock = async () => {
    try {
      setIsLoading(true);

      const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);

      const response = await fetch(
        `${Base_Url}/Api/Item/ItemStocksApi?ItemName=${
          itemName ? itemName : ''
        }&Barcode=${barcode ? barcode : ''}&CompanyId=${
          userDetails.currentCompanyId
        }`,
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );

      const result = await response.json();
      setData(result);

      // after success then clear field
      setBarcode('');
      setItemName('');

      if (result.itemStockList && result.itemStockList.length === 0) {
        // Show alert message
        // ToastAndroid.show('No Data Found ❌', ToastAndroid.SHORT);

        toast.show('No Data Found', {type: 'danger', duration: 1000});
      } else {
        toast.show('Data added successfully', {
          type: 'success',
          duration: 1000,
        });
      }

      // setIsLoader(false); // Stop loading

      console.log('this is item stock data', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false); // Set loading to false when the API call is completed
    }
  };

  return (
    <ScrollView
      style={customStyle.container}
      keyboardShouldPersistTaps={'handled'}>
      {/* ================= Header and Barcode section ================ */}

      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            Item Stock
          </Text>
        </View>

        {/* <Text style={{color:"red"}}>{userDetails.currentCompanyId}</Text> */}
        {/* <Text style={{color: 'red'}}>this is barcode = {barcode}</Text> */}

        {/* barcode scanner */}
        <View style={styles.barcode}>
          <Text style={styles.label}>Barcode</Text>
          {/* <View style={{flex: 1}}> */}

          <TouchableOpacity
            style={styles.input}
            // onPress={() => {
            //   requestPermission();
            //   if (hasPermission) {
            //     setIsCameraActive(true);
            //   }
            // }}

            onPress={handleItemButtonPress}

            // onPress={() => setIsCameraActive(true)}
          >
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

        {/* item name */}
        <View>
          <Text style={styles.label}>Item Name</Text>
          <View style={styles.dropdownPicker}>
            <TextInput
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Item Name"
              placeholderTextColor="gray"
              onChangeText={text => setItemName(text)}
              value={itemName}
            />
          </View>
        </View>

        {/* button */}
        <View style={{alignSelf: 'flex-end', marginTop: 30}}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#0077b6',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              },
            ]}
            onPress={handleItemStock}>
            <Icon name="search" size={15} color="#ffffff" />
            <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 18}}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Display the scanned barcode data */}

      {/* {barcodeData.length > 0 && (
          <View style={{marginVertical: 15}}>
            <Text style={{color: '#000000', fontSize: 18, fontWeight: '500'}}>
              Scanned Barcodes:
            </Text>
            {barcodeData.map((barcode, index) => (
              <Text key={index} style={{color: '#000000', fontSize: 16}}>
                {barcode}
              </Text>
            ))}
          </View>
        )} */}

      {/* ========================= Table section =========================== */}

      <View style={styles.wrapper}>
        {/* table container */}
        <View style={styles.table}>
          {/*========== table head ===========*/}

          <View style={styles.table_head}>
            {/* one single row */}
            <View style={{width: '32%'}}>
              <Text style={styles.table_captions}>Barcode</Text>
            </View>
            <View style={{width: '30%'}}>
              <Text style={styles.table_captions}>Item Name</Text>
            </View>
            <View style={{width: '18%'}}>
              <Text style={styles.table_captions}>Qty</Text>
            </View>
            <View style={{width: '20%'}}>
              <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                UoM
              </Text>
            </View>
          </View>

          {/*========== table body ==========*/}

          {data &&
            data.itemStockList &&
            data.itemStockList.map((item, index) => (
              <View style={styles.table_body} key={index}>
                {/* one single row */}
                <View style={{width: '32%'}}>
                  <Text style={styles.table_data}>{item.barcode}</Text>
                </View>
                <View style={{width: '30%'}}>
                  <Text style={styles.table_data}>{item.itemName}</Text>
                </View>
                <View style={{width: '18%'}}>
                  <Text style={styles.table_data}>{item.availableStock}</Text>
                </View>
                <View style={{width: '20%'}}>
                  <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                    {item.unitOfMeasureName}
                  </Text>
                </View>
              </View>
            ))}

          {/* <View style={[styles.table_body, {borderBottomWidth: 0}]}> */}
        </View>
      </View>

      {/* <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      /> */}

      {/*===== button ===== */}

      {/* <View style={{alignSelf: 'center', marginTop: 100, marginBottom: 10}}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            },
          ]}
          onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" size={15} color="#ffffff" />
          <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 18}}>
            Back
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* loader */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        style={{flex: 1, margin: 0}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="green" />
            <Text style={{color: 'red'}}> Searching </Text>
          </View>
        </View>
      </Modal>

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

export default Items;

const styles = StyleSheet.create({
  // ============ Header and Barcode section design =============

  mainContainer: {
    paddingHorizontal: 15,
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
    borderWidth: 1.5,
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
  },
  table: {
    // margin: 15,
    marginVertical: 50,
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
    fontWeight: '600',
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

  // button
  button: {
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#184e77',
    elevation: 5,
  },

  // modal loading

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255,1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    // elevation: 5,
    flexDirection: 'row',
    gap: 5,
  },
});
