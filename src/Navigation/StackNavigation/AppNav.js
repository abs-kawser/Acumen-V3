import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {AuthContext} from '../../Context/AuthContext';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

const AppNav = () => {
  // const {isLoading, userToken} = useContext(AuthContext);
  const {isLoggedIn, setIsLoggedIn, isLoading, setIsLoading} =
    useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await AsyncStorage.getItem('userData');

        if (userData !== null) {
          setIsLoggedIn(prevUserDetails => ({
            ...prevUserDetails,
            login: true,
            userDetails: JSON.parse(userData),
          }));
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  if (isLoading) {
    return (
      // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      //   <ActivityIndicator size={'large'} />
      // </View>

      <View style={{flex: 1}}>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn.login !== false && isLoggedIn.userDetails !== null ? (
        <StackNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

// && isLoggedIn.userDetails

export default AppNav;

const styles = StyleSheet.create({});
