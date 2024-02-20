import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/Login/LoginScreen';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
