import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AppointmentSummary = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{flex: 1, padding: 10, backgroundColor: '#FFFFFF'}}>
      {/* ====== main header ====== */}
      <View style={{alignSelf: 'center', marginVertical: 10}}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
          Appointment Summary
        </Text>
      </View>

      {/* first section */}
      <View style={styles.first_container}>
        <View style={{marginBottom: 10}}>
          <Text style={[styles.first_header_text, {fontWeight: '700'}]}>
            Appoinment No: AP00135
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.first_header_text}>Date: 20-11-2023</Text>
          <Text style={styles.first_header_text}>Time: 4:00 PM</Text>
        </View>

        <Text style={styles.first_header_text}>
          Customer Name: Yeasir Arafat
        </Text>
        <Text style={styles.first_header_text}>
          Customer Address: Banani, Dhaka
        </Text>
        <Text style={styles.first_header_text}>Purpose: For fitting</Text>

        <Text style={[styles.first_header_text,{marginTop:15}]}>Assigned Employee: Yeasir Arafat</Text>
      </View>

      {/* button */}

      <View style={{alignSelf: 'center', marginVertical: 20}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
            Back
            {/* {t('hello')} */}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AppointmentSummary;

const styles = StyleSheet.create({


  first_container: {
    // height:250,
    // backgroundColor: '#e9ecef', // f8f9fa e9ecef
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    // elevation:5
  },
  // fist section
  first_header_text: {
    fontSize: 18,
    // fontWeight: '600',
    color: '#000000',
  },

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    // backgroundColor: '#2FD790',
    backgroundColor:"rgba(0, 70, 207, 1)",
    elevation: 5,

    marginTop: 100,
    // flex:1,
  },
});
