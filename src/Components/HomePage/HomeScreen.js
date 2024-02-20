import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/AuthContext';
import customStyle from '../../Styles/commonStyle';

import NewActivity from '../../../assets/homeScreen/Activity.svg';
import SalesOrder from '../../../assets/homeScreen/shopping.svg';

import OrderDelivery from '../../../assets/images/orderDelivery.svg';
import Tailor from '../../../assets/images/tailor.svg';
import Items from '../../../assets/images/items.svg';
import Settings from '../../../assets/images/settings.svg';
import {useNetInfo} from '@react-native-community/netinfo';
import NetworkCheck from '../NetworkCheck/NetworkCheck';

import moment from 'moment';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const navigation = useNavigation();
  const net = useNetInfo();

  const {t, i18n} = useTranslation();

  const {isLoggedIn} = useContext(AuthContext);

  // const [currentTime, setCurrentTime] = useState('');

  // console.log("curren",currentTime);

  const [currentTime, setCurrentTime] = useState('');

  const formattedTime12Hour = moment(currentTime, 'HH:mm:ss').format(
    'hh:mm:ss',
  );

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await axios.get(
          'http://worldtimeapi.org/api/timezone/Asia/Dhaka',
        );
        const {datetime} = response.data;

        const datetimes = moment(datetime);
        const formattedTime = datetimes.format('HH:mm:ss');

        setCurrentTime(formattedTime);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchCurrentTime();
    const interval = setInterval(fetchCurrentTime, 1000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  // const fetchTime = () => {
  //   fetch('https://worldtimeapi.org/api/timezone/Asia/Dhaka')
  //     .then(response => response.json())

  //     .then(data => {
  //       const datetime = moment(data.datetime);
  //       const formattedTime = datetime.format('HH:mm:ss A'); // Format according to your needs

  //       console.log("format time",formattedTime);

  //       setCurrentTime(formattedTime);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data: ', error);
  //     });
  // };

  // useEffect(() => {
  //   // Fetch the initial time when the component mounts
  //   fetchTime();

  //   // Set up an interval to refresh the time every second
  //   const intervalId = setInterval(fetchTime, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // ================

  // const fetchTime = () => {
  //   fetch('https://worldtimeapi.org/api/timezone/Asia/Dhaka')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const datetime = new Date(data.datetime);
  //       const formattedTime = datetime.toLocaleString('en-US', {
  //         hour: 'numeric',
  //         minute: 'numeric',
  //         second: 'numeric',
  //         hour12: true,
  //       });
  //       setCurrentTime(formattedTime);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data: ', error);
  //     });
  // };

  // useEffect(() => {
  //   // Fetch the initial time when the component mounts
  //   fetchTime();

  //   // Set up an interval to refresh the time every second
  //   const intervalId = setInterval(fetchTime, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <>
      <ScrollView contentContainerStyle={customStyle.container}>
        <StatusBar
          backgroundColor="#739AFF" // f8f9fa  Set the background color of the status bar
          barStyle="light-content" // Set the style of the status bar text (light or dark)
        />

        {/* ========== camera ========= */}
        {/* <Button title="camera" onPress={() => navigation.navigate('camera')} /> */}

        {/* <View>
          <Text style={{color: 'red'}}>
            The current time in Bangladesh is: {formattedTime12Hour}
          </Text>
        </View> */}

        {/* content */}
        <View style={styles.contentContainer}>
          {/* <DetailsScreen /> */}

          {/* BRAND LOGO */}

          {/* <View style={styles.brandLogo}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={require('../../../assets/images/brand2.png')}
            />
          </View> */}

          {/* employe details */}

          {/* <View> */}
          {/* <LinearGradient
            colors={['#000046', '#1CB5E0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.employeContainer}> */}

          {/* <View style={styles.employeHeader}>
              <View>
                <Text style={styles.employeTxt}>
                  Welcome,{' '}
                  {isLoggedIn.userDetails
                    ? isLoggedIn.userDetails.FullName
                    : ''}
                </Text>
              </View>

              <View>
                <Text style={styles.employeTxt2}>
                  Designation:{' '}
                  {isLoggedIn.userDetails
                    ? isLoggedIn.userDetails.Designation
                    : ''}
                </Text>
                <Text style={styles.employeTxt2}>
                  Position:{' '}
                  {isLoggedIn.userDetails
                    ? isLoggedIn.userDetails.Position
                    : ''}
                </Text>
              </View>
            </View> */}

          {/* </LinearGradient> */}
          {/* </View> */}

          {/* Employe content */}

          <View style={styles.content}>
            <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('New Activity')}>
              <View style={styles.inner}>
                <View>
                  {/* <NewActivity width={50} height={50} /> */}
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/Activity.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {t('navigation.New Activity')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Sales Order')}>
              <View style={[styles.inner, {backgroundColor: '#92BDFD'}]}>
                <View>
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/shopping.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {t('navigation.Sales Order')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Order Delivery')}>
              <View style={[styles.inner, {backgroundColor: '#92BDFD'}]}>
                <View>
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/box.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    {t('navigation.Order Delivery')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Tailoring')}>
              <View style={styles.inner}>
                <View>
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/tailor.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{t('navigation.Tailoring')}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Items')}>
              <View style={styles.inner}>
                <View>
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/items.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{t('navigation.Items')}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Draft')}>
              <View style={[styles.inner, {backgroundColor: '#92BDFD'}]}>
                <View>
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/Draft.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Draft</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Home')}>
              <View style={[styles.inner, {backgroundColor: '#92BDFD'}]}>
                <View>
                <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/settings.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Settings</Text>
                </View>
              </View>
            </TouchableOpacity> */}

            {/* scanner */}

            {/* <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Scanner')}>
              <View style={[styles.inner, {backgroundColor: '#92BDFD'}]}>
                <View>
                  <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/bar-code.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Scanner</Text>
                </View>
              </View>
            </TouchableOpacity> */}

            {/* photo capture */}

            {/* <TouchableOpacity
              style={styles.subContent}
              onPress={() => navigation.navigate('Photo Captures')}>
              <View style={[styles.inner, {backgroundColor: '#92BDFD'}]}>
                <View>
                <Image
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/bar-code.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Camera</Text>
                </View>
              </View>
            </TouchableOpacity> */}

            {/* <LinearGradient
              colors={['#1CB5E0', '#000046']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.subContent}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Approval Summary')}>
                <Text style={styles.employeTxt2}>
                  Attendance Regularization Approval Summary
                </Text>
              </TouchableOpacity>
            </LinearGradient> */}
          </View>
        </View>
      </ScrollView>

      {!net.isConnected ? <NetworkCheck /> : null}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  brandLogo: {
    alignSelf: 'center',
    marginVertical: 25,
    borderWidth: 0.5,
    width: 200,
    height: 55,
    borderColor: '#cce3de',
  },
  employeContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    padding: 25,
  },
  employeHeader: {
    gap: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b4d8',
    padding: 25,
    borderRadius: 10,
  },
  employeTxt: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  employeTxt2: {
    textAlign: 'center',
    fontSize: 13,
    color: '#fff',
  },
  content: {
    // marginVertical: 20,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // height: 123,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: 10,

    width: '100%',
    height: '45%',
    // padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // =============
  subContent: {
    // borderRadius: 10,
    // elevation: 5,
    // width: '47%',
    // height: '100%',

    width: '50%',
    height: '100%',
    padding: 5,
  },

  inner: {
    flex: 1,
    backgroundColor: '#68C8FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 5,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#090000',
    textAlign: 'center',
    lineHeight: 20,
  },
});
