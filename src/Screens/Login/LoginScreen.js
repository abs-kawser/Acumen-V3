import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/AuthContext';
import base64 from 'base-64';
import {Base_Url, PASSWORD, USERNAME} from '../../../variable';
import LoginSvg from '../../../assets/images/login-image.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

import StackNavigator from '../../Navigation/StackNavigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
import {handleDesignTemplate, handleShopEmployeeList, handleShopTailor} from '../../Data/FetchData';

const LoginScreen = () => {
  const navigation = useNavigation();

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  const [username, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoader, setIsLoader] = useState(false); // State for managing loading indicator

  const handleLogin = async () => {
    if (!username || !userPassword) {
      // setError('Please fill in both username and password fields');
      ToastAndroid.show('User ID and Password Required', ToastAndroid.SHORT);
      return;
    }
    setIsLoader(true); // Start loading

    // setIsLoading(true)

    const requestData = {
      UserName: username,
      Password: userPassword,
    };

    const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);

    const response = await fetch(`${Base_Url}/Api/Home/LoginApi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    setIsLoader(false); // Stop loading

    console.log('this is login details', JSON.stringify(result, null, 2));

    if (result.status.isSuccess === true) {
      await AsyncStorage.setItem('userData', JSON.stringify(result));

      // extra data load and store when user login
      await handleShopTailor(result);
      await handleShopEmployeeList(result);
      await handleDesignTemplate(result);

      // setIsLoading(false)

      setIsLoggedIn(prevUserDetails => ({
        ...prevUserDetails,
        login: true,
        userDetails: result,
      }));

      // navigation.navigate('HomeScreen');

      ToastAndroid.show(
        result.status.isSuccess === true && 'Login Successfully',
        ToastAndroid.SHORT,
      );
    } else {
      const errorMessage = 'Please insert correct user name and password';
      setError(errorMessage);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}>
      <StatusBar
        backgroundColor="rgba(61, 151, 240,0.9)" // f8f9fa  Set the background color of the status bar
        barStyle="light-content" // Set the style of the status bar text (light or dark)
      />

      {/* brand view */}

      <View
        style={{
          height: Dimensions.get('window').height / 2.5,
          backgroundColor: '#3d97f0',
        }}>
        {/* <View style={styles.logoContainer}>
          <Text style={{fontWeight: '800', fontSize: 45, color: 'white'}}>
            Sign In
          </Text>
        </View> */}
      </View>

      {/* Bottom View */}

      <View style={styles.bottomView}>
        {/* WELCOME VIEW */}
        <View style={{padding: 25}}>
          <Animatable.Text
            animation="fadeInDown"
            duration={1000}
            style={{
              color: '#313536',
              fontSize: 35,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            Let's Work!
          </Animatable.Text>

          {/* forms input view */}

          <View style={{marginTop: 40}}>
            {/* user name */}

            <Text style={styles.label}>User Name</Text>
            <Animatable.View
              animation="fadeInLeft"
              duration={1000}
              style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Icon name="user" size={20} color="#0B87AC" />
              </View>
              <TextInput
                value={username}
                onChangeText={text => setUserName(text)}
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor="#adb5bd"
              />
            </Animatable.View>

            {/* password */}

            <Text style={styles.label}>Password</Text>

            <Animatable.View
              animation="fadeInLeft"
              duration={1000}
              style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Icon name="lock" size={20} color="#0B87AC" />
              </View>
              <TextInput
                onChangeText={text => setPassword(text)}
                value={userPassword}
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#adb5bd"
                secureTextEntry
              />
            </Animatable.View>

            <View>
              <Text style={{color: '#777B7A', textAlign: 'right'}}>
                Forgot Password?
              </Text>
            </View>

            {error && <Text style={styles.warning}>{error}</Text>}

            {/* button */}
            <Animatable.View animation="fadeInUp" duration={1000}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoader}>
                {isLoader && (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                    style={styles.loadingIndicator}
                  />
                )}
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomView: {
    flex: 1.5,
    backgroundColor: 'white',
    bottom: 50,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    maxWidth: 400, // Limit the input container width for responsiveness
    borderWidth: 1,
    borderColor: '#0B87AC',
  },
  inputIcon: {
    margin: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },

  label: {
    color: '#3B3C3E',
    fontSize: 19,
    fontWeight: '500',
    marginBottom: 10,
  },

  loginButton: {
    backgroundColor: '#2358E1',
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 15, #2358E1 219ebc
    width: '100%',
    maxWidth: 400, // Limit the button width for responsiveness
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    // fontWeight: "500",
    textAlign: 'center',
  },
  warning: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
