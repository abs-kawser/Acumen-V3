import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import customStyle from '../../Styles/commonStyle';
import {useNavigation} from '@react-navigation/native';

const SalesOrderSearch = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={customStyle.container}
      keyboardShouldPersistTaps={'handled'}>
      <View style={styles.mainContainer}>
        {/* top header text */}
        <View style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
            New Sales Order
          </Text>
        </View>

        {/* sales order id */}

        {/* <View style={{marginTop: 15}}>
          <Text style={{color: '#000000', fontSize: 17, fontWeight: '700'}}>
            Sales Order ID : 2023WE10001
          </Text>
        </View> */}

        {/* Add item */}

        <View style={{marginVertical: 10}}>
          <Text style={{color: '#000000', fontSize: 17, fontWeight: '700'}}>
            Add Item & Price
          </Text>
        </View>

        {/* item search */}
        <View>
          <Text style={styles.label}>Item Name / Item id</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              borderRadius: 7,
              paddingHorizontal: 10,
              borderColor: '#0B87AC',
            }}>
            <TextInput
              // style={{ flex: 1 }}
              multiline
              numberOfLines={4}
              style={[styles.input]}
              placeholder="Item name or Id"
              placeholderTextColor="gray"
              value="ITN006"
              // Additional TextInput props can be added here
            />
            <TouchableOpacity style={{}}>
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

      {/* table */}

      <View style={styles.wrapper}>
        {/* table container */}
        <View style={styles.table}>
          {/*========== table head ===========*/}

          <View style={styles.table_head}>
            {/* one single row */}
            <View style={{width: '13%'}}>
              <Text style={styles.table_captions}>Action</Text>
            </View>
            <View style={{width: '22%'}}>
              <Text style={styles.table_captions}>Item</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_captions}>Order Qty</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_captions}>Unit Price</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_captions}>Total Price</Text>
            </View>
            <View style={{width: '20%'}}>
              <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                Remarks
              </Text>
            </View>
          </View>

          {/*========== table body ==========*/}

          <View style={styles.table_body}>
            {/* one single row */}
            <View style={{width: '13%'}}>
              {/* <Text style={styles.table_data}>delete</Text> */}
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: '#ced4da',
                }}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/delete.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '22%'}}>
              <Text style={styles.table_data}>FU1042006</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_data}>20 m</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_data}>18.5</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_data}>20000</Text>
            </View>
            <View style={{width: '20%'}}>
              {/* <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  m
                </Text> */}
              <View
                style={{
                  // borderRightWidth: 1,
                  flex: 1,
                  borderColor: '#ced4da',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={[styles.tableInput]}
                  keyboardType="default"
                  //   value={rowData.qty}
                  //   onChangeText={text => handleQtyChange(index, text)}
                />
              </View>
            </View>
          </View>

          <View style={styles.table_body}>
            {/* one single row */}
            <View style={{width: '13%'}}>
              {/* <Text style={styles.table_data}>delete</Text> */}
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: '#ced4da',
                }}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/delete.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{width: '22%'}}>
              <Text style={styles.table_data}>FU1042006</Text>
              <Text style={styles.table_data}>FU104200656</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_data}>20 m</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_data}>18.5</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_data}>20000</Text>
            </View>
            <View style={{width: '20%'}}>
              {/* <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  m
                </Text> */}
              <View
                style={{
                  // borderRightWidth: 1,
                  flex: 1,
                  borderColor: '#ced4da',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={[styles.tableInput]}
                  keyboardType="default"
                  //   value={rowData.qty}
                  //   onChangeText={text => handleQtyChange(index, text)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* button */}

      <View style={{alignSelf: 'center', marginVertical: 20}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sales Order Summary')}>
          <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
            Save & Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SalesOrderSearch;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
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

  //   table

  // ============ Table design =============
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  table: {
    // margin: 15,
    marginTop: 30,
    // marginHorizontal: 5,
    // borderWidth: 1,
    borderColor: '#ced4da',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  table_head: {
    flexDirection: 'row',
    backgroundColor: '#a2d4f8',
  },
  table_captions: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 5,

    fontSize: 13,
    flex: 1,
  },

  table_body: {
    flexDirection: 'row',
    // backgroundColor: '#deffe9',

    backgroundColor: 'rgba(222,255,233,0.5) ',
    // padding: 10, b5e48c E2F6F8

    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',
  },
  table_data: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 2,
    flex: 1,
  },
  tableInput: {
    textAlign: 'center',
    // borderRightWidth: 1,
    padding: 5,
    color: 'black',
    // borderColor: '#ced4da',
    // backgroundColor: '#ffffff',
    margin: 2,
    height: 25,
    borderRadius: 12,

    borderWidth: 1,
  },

  // button

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2FD790',
    elevation: 5,

    marginTop: 100,
    // flex:1,
  },
});
