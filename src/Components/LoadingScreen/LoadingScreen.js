import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import customStyle from '../../Styles/commonStyle';


const LoadingScreen = () => {
  return (
    <View style={customStyle.loadingContainer}>
      <View style={customStyle.logoContainer}>
        <Image
          source={require('../../../assets/images/Acumen.png')}
          style={customStyle.loadingImage}
        />
      </View>

      <View style={customStyle.indicatorContainer}>
        <ActivityIndicator size="large" color="#adb5bd" />
      </View>
    </View>
  );
};

export default LoadingScreen;