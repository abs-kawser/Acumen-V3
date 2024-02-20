import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import customStyle from '../../Styles/commonStyle';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import axios from 'axios';

import base64 from 'base-64';
import {Base_Url, PASSWORD, USERNAME} from '../../../variable';
import {AuthContext} from '../../Context/AuthContext';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'ActivitySpecification.db'});

const ActivitySpecification = () => {
  const navigation = useNavigation();

  // ====== context api =======
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  //state
  const [isClicked, setClicked] = useState(false);
  const [searchText, setSearchText] = useState(' ');
  const [apiData, setApiData] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  // console.log(
  //   'selectedCustomer data 31',
  //   JSON.stringify(selectedCustomer, null, 2),
  // );

  // =========== MAIN =============

  // handle tamplaete data

  const tamplateDatafetch = async () => {
    try {
      const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
      const response = await axios.get(
        `${Base_Url}/api/Master/DesignTemplateApi?EmpId=${userDetails.empId}`,
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );
      const result = response.data;
      // console.log('this is tamplateDatafetch 158', JSON.stringify(result, null, 2));
      setApiData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    tamplateDatafetch();
  }, []);

  //====== Localy save data part start ================//

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        'DROP TABLE IF EXISTS specification_user',
        [],
        (tx, res) => {
          console.log('Table dropped successfully');
        },
        error => {
          console.log('Error dropping table:', error);
        },
      );

      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS specification_user(' +
          'user_id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
          'designName TEXT, ' +
          'qty TEXT, ' +
          'measurement TEXT, ' +
          'remarks TEXT' +
          ');',
        [],
        (tx, res) => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error creating table:', error);
        },
      );
    });
  }, []);

  const saveDataToSQLite = () => {
    if (selectedCustomer.length > 0) {
      db.transaction(txn => {
        // Fetch existing data
        txn.executeSql(
          'SELECT * FROM specification_user',
          [],
          (tx, res) => {
            const existingData = [];
            const rows = res.rows;
            for (let i = 0; i < rows.length; i++) {
              existingData.push(rows.item(i));
            }

            // Check if each selected entry already exists
            const newData = selectedCustomer.filter(newEntry => {
              return !existingData.some(
                existingEntry =>
                  existingEntry.designName === newEntry.designName,
              );
            });

            // Insert only the new data that doesn't already exist in the table
            newData.forEach(customer => {
              txn.executeSql(
                'INSERT INTO specification_user (designName, qty, measurement, remarks) VALUES (?, ?, ?, ?)',
                [
                  customer.designName,
                  customer.qty,
                  customer.measurement,
                  customer.remarks,
                ],
                (_, insertRes) => {
                  if (insertRes.rowsAffected > 0) {
                    console.log('Data inserted successfully');
                  } else {
                    console.log('Failed to insert data');
                  }
                },
                error => {
                  console.log(error);
                },
              );
            });

            // Log the inserted data
            txn.executeSql(
              'SELECT * FROM specification_user',
              [],
              (_, selectRes) => {
                const finalData = [];
                const selectRows = selectRes.rows;
                for (let i = 0; i < selectRows.length; i++) {
                  finalData.push(selectRows.item(i));
                }
                console.log(
                  'localy save  finalData 313',
                  JSON.stringify(finalData, null, 2),
                );
              },
              selectError => {
                console.log('Error fetching locally saved data:', selectError);
              },
            );
          },
          error => {
            console.log('Error fetching existing data:', error);
          },
        );
      });
    }
  };

  return (
    <ScrollView style={customStyle.container}>
      {/* Activity no */}
      <View style={{alignSelf: 'center', marginVertical: 10}}>
        <Text style={{color: '#000000', fontSize: 20}}>
          {/* Activity No: {deviceActivityId} */}
          Activity No: 123456789
        </Text>
      </View>
      {/* date time */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View>
          <Text>
            {' '}
            <Text style={{fontWeight: '800', color: 'black'}}>Date:</Text>{' '}
            20/01/2023
          </Text>
        </View>
        <View>
          <Text>
            <Text style={{fontWeight: '800', color: 'black'}}>Time:</Text> 10:35
            AM
          </Text>
        </View>
      </View>

      <View style={{alignSelf: 'center', paddingVertical: 20}}>
        <Text style={{fontWeight: '700', fontSize: 20, color: '#000000'}}>
          Specification Info
        </Text>
      </View>
      {/* ======================== */}

      {/* specification */}
      {/* <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
        <Text style={styles.label}>Specification</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            multiline
            numberOfLines={4}
            style={[styles.input]}
            placeholder="Enter Specification"
            placeholderTextColor="black"
          //   onChangeText={text => setReason(text)}
          //   value={reason}
          />
        </View>
      </View> */}

      <View style={{marginTop: 10, paddingHorizontal: 10}}>
        <View>
          <Text style={styles.label}>Specification test</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => {
              setSearchText('');
              setClicked(!isClicked);
            }}>
            {/* <Text style={{color: 'gray'}}>
        {selectedCustomer
          ? selectedCustomer.designName
          : 'Enter Specification'}
      </Text> */}

            <Text style={{color: 'gray'}}>
              {selectedCustomer.length > 0
                ? selectedCustomer[selectedCustomer.length - 1].designName
                : 'Enter Specification'}
            </Text>

            <Icon name="sort-down" size={15} color="gray" />
          </TouchableOpacity>

          <Modal
            isVisible={isClicked}
            onBackdropPress={() => setClicked(false)}>
            <View style={styles.dropdownArea}>
              <TextInput
                placeholder="Search"
                style={styles.searchInput}
                onChangeText={text => setSearchText(text)}
                placeholderTextColor="gray"
              />
              {
                // apiData && (
                <FlatList
                  data={
                    apiData &&
                    apiData.filter(item =>
                      item.designName
                        .toLowerCase()
                        .includes(searchText.toLowerCase()),
                    )
                  }
                  keyExtractor={(item, index) => index.toString()} // Use a unique identifier for each item
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={{
                        width: '85%',
                        alignSelf: 'center',
                        height: 50,
                        justifyContent: 'center',
                        borderBottomWidth: 0.5,
                        borderColor: '#8e8e8e',
                      }}
                      // onPress={() => {
                      //   setSelectedCustomer(item);
                      //   setClicked(!isClicked);
                      // }}>
                      onPress={() => {
                        setSelectedCustomer([...selectedCustomer, item]);
                        setClicked(!isClicked);
                      }}>
                      <Text style={{fontWeight: '600', color: 'gray'}}>
                        {item?.designName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                // )
              }
            </View>
          </Modal>
        </View>
      </View>

      {/* ================== */}

      {/* table 2 */}
      <View style={styles.wrapper}>
        {/* table container */}
        <View style={styles.table}>
          {/*========== table head ===========*/}
          <View style={styles.table_head}>
            {/* one single row */}
            <View style={{width: '15%'}}>
              <Text style={styles.table_captions}>Action</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={styles.table_captions}>Name</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.table_captions}>Qty</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={styles.table_captions}>Measurement</Text>
            </View>
            <View style={{width: '20%'}}>
              <Text style={[styles.table_captions, {borderRightWidth: 0}]}>
                Remarks
              </Text>
            </View>
          </View>

          {/*========== table body ==========*/}
          {selectedCustomer.map((customer, index) => (
            <View style={styles.table_body}>
              {/* one single row */}
              <View style={{width: '15%'}}>
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
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>{customer.designName}</Text>
              </View>
              <View style={{width: '15%'}}>
                {/* <Text style={styles.table_data}>18.5</Text> */}
                <View
                  style={{
                    borderRightWidth: 1,
                    flex: 1,
                    borderColor: '#ced4da',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={[styles.tableInput]}
                    keyboardType="numeric"
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
                  />
                </View>
              </View>
              <View style={{width: '25%'}}>
                <View
                  style={{
                    borderRightWidth: 1,
                    flex: 1,
                    borderColor: '#ced4da',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={[styles.tableInput]}
                    keyboardType="numeric"
                    //   value={rowData.qty}
                    //   onChangeText={text => handleQtyChange(index, text)}
                  />
                </View>
              </View>
              <View style={{width: '20%'}}>
                <View
                  style={{
                    borderRightWidth: 1,
                    flex: 1,
                    borderColor: '#ced4da',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={[styles.tableInput]}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* button */}

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
          flexDirection: 'row',
          marginTop: 100,
          gap: 20,
        }}>
        <View
          style={{
            backgroundColor: '#F7D2D2AB',
            paddingHorizontal: 40,
            paddingVertical: 12,
            borderRadius: 50,
            borderColor: 'red',
            borderWidth: 1,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Activity Check')}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'red', fontWeight: '700'}}>Back</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#04C1AA30',
            paddingHorizontal: 40,
            paddingVertical: 12,
            borderRadius: 50,
            borderColor: '#04C1AA',
            borderWidth: 1,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Activity Check')}
            //   onPress={handleNewActivity}
            onPress={saveDataToSQLite}>
            <Text style={{color: '#04C1AA', fontWeight: '700'}}>
              Save & Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ActivitySpecification;

const styles = StyleSheet.create({
  mainContainer: {
    // paddingHorizontal: 5,
  },

  barcode: {
    paddingHorizontal: 10,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    fontWeight: '700',
  },

  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#0B87AC',
    borderRadius: 5,
    // marginTop: 20,
    paddingHorizontal: 15,
    color: 'black',
  },

  buttonComponent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },

  //   table

  tableContainer: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
    marginVertical: 25,
    // margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C1C0B9',
  },

  tableRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C1C0B9',
    height: 30,
    backgroundColor: '#DEE7FD',
  },
  headerRow: {
    backgroundColor: '#739AFF8F',
    height: 30,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  cell: {
    textAlign: 'center',
    color: 'black',
  },
  tableInput: {
    textAlign: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 0,
    color: 'black',
    borderColor: 'gray',
  },

  checkboxContainer: {
    alignSelf: 'center',
  },

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
    backgroundColor: '#BFE7F0',
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
    backgroundColor: '#E2F6F8',
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
    padding: 9,
  },
  tableInput: {
    textAlign: 'center',
    // borderRightWidth: 1,
    padding: 0,
    color: 'black',
    // borderColor: '#ced4da',
    backgroundColor: '#ffffff',
    margin: 2,
    height: 25,
    borderRadius: 15,
  },
  dropdownSelector: {
    width: '100%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#0B87AC',
    display: 'flex',
    flexDirection: 'row',
    // alignItems:"center",
    justifyContent: 'space-between',
  },

  dropdownArea: {
    width: '90%',
    height: '50%',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    zIndex: 200,
  },
  searchInput: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
    color: 'gray',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'row',
    gap: 5,
  },
});
