import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import customStyle from '../../Styles/commonStyle';
import { useNavigation } from '@react-navigation/native';

const OrderDelivery = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={customStyle.container}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            Sales Order Delivery
          </Text>
        </View>

        {/* item search */}
        <View style={{marginVertical: 25}}>
          <Text style={styles.label}>Sales Order ID</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            <TextInput
              // style={{ flex: 1 }}
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Sales order Id"
              placeholderTextColor="gray"
              // Additional TextInput props can be added here
            />
            <TouchableOpacity style={{}} onPress={()=>navigation.navigate("Order Status")}>
              <Image
                source={require('../../../assets/homeScreen/search2.png')} // Replace with the path to your icon
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 15,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDelivery;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    // marginVertical:15
  },
  input: {
    width: '100%',
    height: 45,
    // borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,
    // paddingHorizontal: 15,
    color: 'gray',
    flex: 1,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    fontWeight: '700',
  },
});
