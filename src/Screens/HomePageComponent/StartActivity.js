import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import customStyle from '../../Styles/commonStyle';
import { useNavigation } from '@react-navigation/native';
  
  const StartActivity = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={{flex:0.5,marginTop:50,}} >
          <Text style={{color: '#000000',textAlign:"center",fontSize:36,fontWeight:"500"}}>Start Activity</Text>
        </View>
  
        <View style={styles.startContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate("New Activity")}>
            <Image
              style={{width: 150, height: 150, resizeMode: 'contain'}}
              source={require('../../../assets/homeScreen/start.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default StartActivity;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      // gap:-110
    },
    startContainer: {
      flex:1,
      // justifyContent: 'center',
      alignItems: 'center',
      // marginTop:50
  
      // flexDirection:"column",
      // display:"flex",
    
    },  
  });
  