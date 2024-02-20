import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import base64 from 'base-64';
import customStyle from '../../Styles/commonStyle';
import {Base_Url, PASSWORD, USERNAME} from '../../../variable';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ChangePassword = () => {
  // ====== context api =======
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  //  hooks
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    // if (newPassword !== ConfirmPassword) {
    //   // Passwords do not match, show a toast message
    //   ToastAndroid.show(
    //     "New password and confirm password do not match.",
    //     ToastAndroid.SHORT
    //   );
    //   return;
    // }

    try {
      const requestData = {
        EmpId: userDetails.empId,
        OldPassword: oldPassword,
        NewPassword: newPassword,
        NewConfirmPassword: confirmPassword,
      };

      console.log(
        'posting password data',
        JSON.stringify(requestData, null, 2),
      );

      const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
      const response = await fetch(`${Base_Url}/Api/Home/ChangePasswordApi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      console.log('change password response', JSON.stringify(result, null, 2));

      if (result.status) {
        ToastAndroid.show(result.status, ToastAndroid.SHORT);
        //navigation.navigate("Home");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred:', error);
    }
  };

  return (
    <ScrollView style={customStyle.container}>
      <View style={styles.mainContainer}>
        {/* HEADER */}
        <View
          style={{
            alignSelf: 'center',
            marginVertical: 15,
            borderWidth: 0.5,
            borderColor: 'gray',
            padding: 40,
            borderRadius: 100,
          }}>
          {/* <Text style={{color: '#2c7da0', fontSize: 30, fontWeight: '700'}}>
            Change Password
          </Text> */}

          <Image
            style={{width: 90, height: 90, resizeMode: 'contain'}}
            source={require('../../../assets/homeScreen/passwords.png')}
          />
        </View>

        {/* FORM */}
        <View style={styles.leaveContent}>
          <Text style={styles.label}>Old Password</Text>
          <View style={styles.inputboxContainer}>
            <View style={styles.inputIcon}>
              <Icon name="lock" size={20} color="#457b9d" />
            </View>
            <TextInput
              style={[styles.input]}
              placeholder="Old Password"
              placeholderTextColor="gray"
              onChangeText={text => setOldPassword(text)}
              value={oldPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.leaveContent}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputboxContainer}>
            <View style={styles.inputIcon}>
              <Icon name="lock" size={20} color="#457b9d" />
            </View>
            <TextInput
              style={[styles.input]}
              placeholder="New Password"
              placeholderTextColor="gray"
              onChangeText={text => setNewPassword(text)}
              value={newPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.leaveContent}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputboxContainer}>
            <View style={styles.inputIcon}>
              <Icon name="lock" size={20} color="#457b9d" />
            </View>
            <TextInput
              style={[styles.input]}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
            />
          </View>
        </View>

        {/* button */}

        <View style={{marginVertical: 40}}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}>
            <Text
              style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Change Password
              {/* {t('hello')} */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 8,
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
  inputboxContainer: {
    borderWidth: 1.2,
    borderColor: '#0B87AC',
    borderRadius: 5,
    height: 45,
    // backgroundColor: '#FFFFFF',
    // justifyContent: 'center',

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    // borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,

    // paddingHorizontal: 15,
    color: 'black',
    // flex: 1,
  },

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4cc9f0',
    // elevation: 5,
    // height:"auto"
    // flex:1,
  },

  inputIcon: {
    marginHorizontal: 10,
  },
});
