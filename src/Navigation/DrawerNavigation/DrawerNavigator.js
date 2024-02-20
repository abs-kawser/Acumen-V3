import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../Components/HomePage/HomeScreen';
import DrawerItem from './DrawerItems';

import CustomHeaderRight from '../../Components/CustomHeaderRight';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [showAboveHeaderButton, setShowAboveHeaderButton] = useState(false);

  // Function to handle dot button press
  const handleDotButtonPress = (show) => {
    setShowAboveHeaderButton(show);
  };


  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerItem {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#739AFF',
          elevation: 50,
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderBottomColor: '#e9ecef',
        },
        headerRight: () => <CustomHeaderRight onDotButtonPress={handleDotButtonPress} />,
      }}>
      {/* self service 168aad */} 
      <Drawer.Screen name="Home" component={HomeScreen} />


    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
