import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SalesOrderSummary = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{flex: 1, padding: 10, backgroundColor: '#FFFFFF'}}>
      {/* ====== main header ====== */}
      <View style={{alignSelf: 'center', marginVertical: 10}}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
          Sales Order Summary
        </Text>
      </View>

      {/* first section */}
      <View style={styles.first_container}>
        <View style={{marginBottom: 10}}>
          <Text style={[styles.first_header_text, {fontWeight: '700'}]}>
            Sales Order ID: 2023WE10001
          </Text>
        </View>
        <Text style={styles.first_header_text}>Date: 20-11-2023</Text>
        <Text style={styles.first_header_text}>
          Customer Name: Yeasir Arafat
        </Text>
        <Text style={styles.first_header_text}>
          Customer Address: Banani, Dhaka
        </Text>
        <Text style={styles.first_header_text}>Sales Person: Ariyan Arif</Text>
      </View>

      {/*========= Items details ==============*/}
      <View style={styles.order_container}>
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#6C6D6D'}}>
            Item Details
          </Text>
        </View>

        {/* ========================= Table section =========================== */}

        <View style={styles.wrapper}>
          {/* table container */}
          <View style={styles.table}>
            {/*========== table head ===========*/}

            <View style={styles.table_head}>
              {/* one single row */}
              <View style={{width: '22%'}}>
                <Text style={styles.table_captions}>Item</Text>
              </View>
              <View style={{width: '18%'}}>
                <Text style={styles.table_captions}>Order Qty</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_captions}>Unit Price</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_captions}>Total Price</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_captions}>Remarks</Text>
              </View>
            </View>

            {/*========== table body ==========*/}

            <View style={styles.table_body}>
              {/* one single row */}
              <View style={{width: '22%'}}>
                <Text style={styles.table_data}>FU1004286</Text>
              </View>
              <View style={{width: '18%'}}>
                <Text style={styles.table_data}>20</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>20</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>20</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>Test</Text>
              </View>
            </View>

            <View style={styles.table_body}>
              {/* one single row */}
              <View style={{width: '22%'}}>
                <Text style={styles.table_data}>FU1004286</Text>
              </View>
              <View style={{width: '18%'}}>
                <Text style={styles.table_data}>20</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>20</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>20</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>Test</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* PRICE */}

      <View
        style={{
          alignSelf: 'flex-end',
          marginTop: 50,
          padding: 15,
          backgroundColor: 'rgba(233,236,239,0.3)',
          // flex: 1,
          width: '100%',

        }}>
        <Text style={styles.priceSection}>Total Price: 2000</Text>
        <Text style={styles.priceSection}>Due: 250</Text>
      </View>

       {/* button */}

       <View style={{alignSelf: 'center', marginVertical: 50}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SalesOrderSummary;

const styles = StyleSheet.create({
  first_container: {
    // height:250,
    // backgroundColor: '#e9ecef', // f8f9fa e9ecef
    backgroundColor:"rgba(242, 242, 242, 0.7)",
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    // elevation:5
  },
  order_container: {
    marginVertical: 10,

  },

  // fist section
  first_header_text: {
    fontSize: 18,
    // fontWeight: '600',
    color: '#000000',
  },

  // ============ Table design =============
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  table: {
    // margin: 15,
    marginTop: 10,
    // marginHorizontal: 5,
    // borderWidth: 1,
    borderColor: '#ced4da',
    borderTopWidth: 1,
    // borderRightWidth: 1,
    borderLeftWidth: 1,

    // elevation: 2,
  },
  table_head: {
    flexDirection: 'row',
    // backgroundColor: '#BFE7F0',

    backgroundColor: '#e9ecef',
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
  },
  table_captions: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    // borderRightColor: '#000000',
    padding: 5,

    flex: 1,
    fontSize: 12,
  },

  table_body: {
    flexDirection: 'row',
    // backgroundColor: '#E2F6F8',

    // backgroundColor: '#e9ecef',
    backgroundColor:"rgba(242, 242, 242, 0.7)",
    // padding: 10,

    borderBottomWidth: 1,
    borderBottomColor: '#ced4da',

    
  },
  table_data: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',

    borderRightWidth: 1,
    borderRightColor: '#ced4da',
    padding: 5,

    flex: 1,
    // flexWrap:"wrap"
  },

  button: {
    // borderWidth:1,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2FD790',
    elevation: 5,
    // flex:1,
  },

  // total price

  priceSection: {
    fontSize: 25,
    color: '#495057',
    fontWeight: '600',
    textAlign: 'right',
  },
});
