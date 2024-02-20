import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderDetails = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{flex: 1, padding: 4, backgroundColor: '#FFFFFF'}}>
        <>
      <View style={{alignSelf: 'center', marginVertical: 10}}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '700'}}>
          Sales Order Details
        </Text>
      </View>

      {/* first section */}
      <View style={styles.first_container}>
        <Text style={styles.first_header_text}>Sales Order: 4456454</Text>
        <Text style={styles.first_header_text}>Delivery Date: 20-11-2023</Text>
        <Text style={styles.first_header_text}>
          Customer Name: Yeasir Arafat
        </Text>
        <Text style={styles.first_header_text}>Entity Name: Kawser</Text>
        <Text style={styles.first_header_text}>Sold By: Arif</Text>
      </View>

      {/* order details */}
      <View style={styles.order_container}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: '#6C6D6D'}}>
            Order Details
          </Text>
        </View>

        {/* ========================= Table section =========================== */}

        <View style={styles.wrapper}>
          {/* table container */}
          <View style={styles.table}>
            {/*========== table head ===========*/}

            <View style={styles.table_head}>
              {/* one single row */}
              <View style={{width: '25%'}}>
                <Text style={styles.table_captions}>Item name & code</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_captions}>Order Qty</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_captions}>Remaining Qty</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_captions}>Delivery Qty</Text>
              </View>
              <View style={{width: '25%'}}>
                <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                  Status
                </Text>
              </View>
            </View>

            {/*========== table body ==========*/}

            <View style={styles.table_body}>
              {/* one single row */}
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>KD-277-C & FU1004282</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_data}>20 (m)</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>20 (m)</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_data}>0 (m)</Text>
              </View>
              <View style={{width: '25%'}}>
                <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  pending
                </Text>
              </View>
            </View>

            <View style={styles.table_body}>
              {/* one single row */}
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>KD-277-C & FU1004282</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_data}>20 (m)</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.table_data}>20 (m)</Text>
              </View>
              <View style={{width: '15%'}}>
                <Text style={styles.table_data}>0 (m)</Text>
              </View>
              <View style={{width: '25%'}}>
                <Text style={[styles.table_data, {borderRightWidth: 0}]}>
                  Partial Delivery
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/*===== button ===== */}

      <View style={{alignSelf: 'center', marginTop: 100,marginBottom:10}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 22}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      </>
    </ScrollView>


  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  first_container: {
    // height:250,
    backgroundColor: '#e9ecef', // f8f9fa e9ecef
    padding: 15,
    marginTop: 10,
    // elevation:5
  },
  order_container: {
    marginVertical: 10,
    // elevation:5
  },

  item_container: {
    marginBottom: 10,
    flex: 1,
  },

  // fist section
  first_header_text: {
    fontSize: 18,
    fontWeight: '600',
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
    borderRightWidth: 1,
    borderLeftWidth: 1,

    // elevation: 2,
  },
  table_head: {
    flexDirection: 'row',
    // backgroundColor: '#BFE7F0',

    backgroundColor: '#e9ecef',
    borderBottomWidth: 1,
    borderBottomColor: '#6c757d',
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

    backgroundColor: '#e9ecef',
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
    backgroundColor: '#184e77',
    elevation: 5,
    // flex:1,
  },
});
