import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';


const NetworkCheck = () => {
  return (
    <View style={styles.connectionHeader}>
      {/* <Image
        style={styles.logo}
        source={require('../../../assets/no-internet.png')}
      /> */}
      <Text style={styles.connectionTitle}>No Internet Connection!!</Text>
    </View>
  );
};

export default NetworkCheck;

const styles = StyleSheet.create({
  connectionHeader: {
    backgroundColor: 'red',
    position: 'absolute',
    // top: 55,
    right: 5,
    left: 5,
    borderRadius: 5,
    // flex:1
  },
  logo: {
    height: 150,
    width: 150,
  },
  connectionTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    padding: 2,
    fontFamily: 'Jost-Regular',
    // height:"100%",
    // width:"100%",
  },
});
