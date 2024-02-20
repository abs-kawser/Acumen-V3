import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
  Animated,
  Alert,
  ToastAndroid,
} from 'react-native';
import customStyle from '../../Styles/commonStyle';
import {useCameraPermission, Camera} from 'react-native-vision-camera';
import CameraComponent from '../CameraComponent';
import Modal from 'react-native-modal';

// import '../../Locales/index';

import {useTranslation} from 'react-i18next';
import {useLanguage} from '../../Context/LanguageProvider';

import {useToast} from 'react-native-toast-notifications';

const ScannerScreen = () => {
  const toast = useToast();

  const {t, i18n} = useTranslation();

  const {currentLanguage, handleLanguageChange} = useLanguage();

  // const [currentLanguage,setLanguage] =useState('en');

  // const handleLanguageChange = value => {
  //   i18n
  //     .changeLanguage(value)
  //     .then(() => setLanguage(value))
  //     .catch(err => console.log(err));
  // };

  // scanner red line blinking

  const [showText, setShowText] = useState(true);



  const hasScannedRef = useRef(false);
  const {hasPermission, requestPermission} = useCameraPermission();

  const [barcodeData, setBarcodeData] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);


  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText(showText => !showText);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  const handleCodeScanned = codes => {
    // Update the UI with the scanned barcode data

    console.log('this is barcode data', codes);

    // const newBarcodeDataList = [...barcodeData, codes[0].value];

    // const data = codes[0].value.length;

    // if (data !== 13) {
    //   Alert.alert("value not proper")
    // }

    if (codes[0].value.length === 13) {
      // Update the UI with the scanned barcode data
      const newBarcodeDataList = [...barcodeData, codes[0].value];
      setBarcodeData(newBarcodeDataList);

      setIsCameraActive(false);
    } else {
      
      // toast.show('Barcode not matching', {
      //   type: 'danger',
      //   placement: 'bottom',
      //   duration: 4000,
      //   offset: 30,
      //   animationType: 'slide-in',
      // });

      ToastAndroid.show(
        "Barcode Doesn't Match",
        ToastAndroid.SHORT,
      );

     
    }

    // setBarcodeData(newBarcodeDataList);

    hasScannedRef.current = true;

    // Close the camera after updating the UI
    // setIsCameraActive(false);

    // Reset the hasScannedRef variable to prevent multiple calls
    hasScannedRef.current = false;
  };

  // useEffect(() => {
  //   // Display an alert if no barcode is found
  //   if (isCameraActive && !barcodeData && !hasScannedRef.current) {
  //     Alert.alert('No Barcode Found', 'Please try again.');
  //   }
  // }, [isCameraActive, barcodeData]);





  // const handleItemButtonPress = async () => {
  //   try {
  //     setIsRequestingPermission(true);
  //     const permission = await requestPermission();

  //     if (permission) {
  //       setIsCameraActive(true);
  //     } else {
  //       console.error('Camera permission denied');
  //     }
  //   } catch (error) {
  //     console.error('Error handling camera permission:', error);
  //   } finally {
  //     setIsRequestingPermission(false);
  //   }
  // };

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

  // ============================

  return (
    <View style={{flex: 1}}>
      {/* <ScrollView style={customStyle.container}> */}

      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            Item Stock
          </Text>
        </View>

        {/* barcode scanner */}
        <View style={styles.barcode}>
          <Text style={styles.label}>Barcode</Text>

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
        </View>
      </View>

      {/* Display the scanned barcode data */}
      {/* {barcodeData.length > 0 && ( */}
      {barcodeData.length > 0 && (
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
      )}

      {/* <Text style={{color:"black",margin:50,fontSize:15,fontFamily:"Potro-Bold"}}>ইয়াসির আরাফাত আরিফ</Text> */}

      <Text style={{color: 'black', padding: 50, fontSize: 15}}>
        {t('translation.this line is translated')}{' '}
      </Text>

      <Text
        style={{
          color: 'white',
          padding: 50,
          fontSize: 15,
          backgroundColor: 'black',
        }}>
        {t('navigation.New Activity')}
      </Text>

      <View style={{marginBottom: 10}}>
        <Button
          title="change to bd"
          onPress={() => handleLanguageChange('bd')}
        />
      </View>

      <Button title="change to en" onPress={() => handleLanguageChange('en')} />

      {/* </ScrollView> */}

      {/* camera */}
      {/* {isRequestingPermission && <ActivityIndicator />} */}

      {/* {isCameraActive && (
        <Modal
          animationType="fade"
          transparent={false}
          visible={isCameraActive}
          // style={{flex: 1, margin: 0}}
          onRequestClose={() => setIsCameraActive(false)}>
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}></View>
          <CameraComponent
            isActive={isCameraActive}
            onCodeScanned={handleCodeScanned}
          />
        </Modal>
      )} */}




{/* ======== scanner camera ======= */}

      {isCameraActive && (
        <Modal
          animationType="fade"
          transparent={true} // Set to true to make the modal transparent
          visible={isCameraActive}
          onRequestClose={() => setIsCameraActive(false)}
          style={{margin: 0}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            {/* Background overlay */}

            {/* CameraComponent */}
            {/* <CameraComponent
              isActive={isCameraActive}
              onCodeScanned={handleCodeScanned}
            /> */}

            <View
              style={{
                // height: 300,
                // backgroundColor: 'green',

                // width: 300,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
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
                  // display: showText ? 'none' : 'flex',
                }}>
                <View
                  style={{
                    // width: '100%',
                    height: 1,
                    borderRadius: 30,
                    backgroundColor: 'green',
                    position: 'relative',
                    display: showText ? 'none' : 'flex',

                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // flexDirection:"column",
                    marginTop: '50%',

                    // flex:1
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}




    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: 'black',
  },
});
