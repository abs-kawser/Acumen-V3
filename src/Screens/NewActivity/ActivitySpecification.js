import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Alert,
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
import {
  deleteSpecificationData,
  getSpecificationData,
  getSpecificationDataByDeviceActivityId,
  initSpecificationTable,
  insertSpecificationData,
} from '../../Database/SpecificationTable';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';


const ActivitySpecification = ({route}) => {
  const navigation = useNavigation();

  const {devID} = route.params;

  // ====== context api =======
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  //state
  const [isClicked, setClicked] = useState(false);
  const [searchText, setSearchText] = useState(' ');
  const [apiData, setApiData] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  // const [measurement, setMeasurement] = useState(null);
  // const [qty, setQty] = useState(null);
  // const [remarks, setRemarks] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("selected item ======",selectedItem?.designName)

  const utcDateTime = moment.utc();
  const bdDateTime = utcDateTime.tz('Asia/Dhaka').format('YYYY-MM-DDTHH:mm:ss');



  const [saveData, setSavedData] = useState([]);

  console.log('this is SPECIFICATION item data from sqlite',  JSON.stringify(saveData, null, 2));






  // console.log('tbale dtaaaa', JSON.stringify(tableData,null,2));

  // console.log('table dataaaaaa', JSON.stringify(selectedCustomer, null, 2));

  // console.log("selected customer",JSON.stringify(selectedCustomer,null,2))

  // const [userList, setUserList] = useState([]);

  // console.log(
  //   'this is sqlite local storage data',
  //   JSON.stringify(userList, null, 2),
  // );

  // ====== arif ======

  useEffect(() => {
    initSpecificationTable();
    getData();
  }, []);

  const handleSaveButtonClick = () => {
    console.log(
      'Specific Table Data ========== :',
      JSON.stringify(tableData, null, 2),
    );

    insertSpecificationData(tableData, (success, dataAlreadyExists) => {
      if (success) {
        if (dataAlreadyExists) {
          Alert.alert(
            'Data already exists in the database. Only new data inserted.',
          );
        } else {
          Alert.alert('Data inserted successfully');
          navigation.goBack();
          // navigation.navigate('Activity Summary');
          // Activity Summary
          getData();
        }
      } else {
        Alert.alert('Failed to insert data');
      }
    });
  };

  // const getData = () => {
  //   getSpecificationData(item =>
  //     console.log(
  //       'this is SPECIFICATION item data from sqlite',
  //       JSON.stringify(item, null, 2),
  //     )
  //   );
  // };






  const getData = () => {
    // getSpecificationData(item => {
    //       // console.log('this is SPECIFICATION item data from sqlite',  JSON.stringify(item, null, 2));
    //   setSavedData(item); // Update the state with the fetched data
    // });
    getSpecificationDataByDeviceActivityId(devID , (item) => {setSavedData(item)} )
  };
  


  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Call getData when the screen comes into focus
  //     getData();
  //   }, [])
  // );






  const addItemToTable = () => {
    if (selectedItem) {
      // Create a new table entry with default values
      const newTable = {
        DesignTemplateId: selectedItem.designTemplateId,
        SpecQty: '',
        Measurement: '',
        Remarks: '',
        DeviceSystemDateTime: bdDateTime,
        Name: selectedItem.designName,
        DeviceActivityId: devID,
        Name:selectedItem.designName
      };

      // Add the new table entry to the tableData state
      setTableData(prevTables => [...prevTables, newTable]);
      // Reset selectedItem
      // setSelectedItem(null);
      // Display data in console
      // console.log('Tables Data:', tableData);
    } else {
      console.log('Please select an item from the dropdown.');
    }
  };

  useEffect(() => {
    if (selectedItem) {
      addItemToTable();
    }
  }, [selectedItem]);

  const handleQtyChange = (index, text) => {
    const updatedCustomers = [...tableData];
    updatedCustomers[index] = {...updatedCustomers[index], SpecQty: text};
    setTableData(updatedCustomers);
  };

  const handleMeasurementChange = (index, text) => {
    const updatedCustomers = [...tableData];
    updatedCustomers[index] = {...updatedCustomers[index], Measurement: text};
    setTableData(updatedCustomers);
  };

  const handleRemarksChange = (index, text) => {
    const updatedCustomers = [...tableData];
    updatedCustomers[index] = {...updatedCustomers[index], Remarks: text};
    setTableData(updatedCustomers);
  };

  const handleDeleteRow = index => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1); // Remove the row at the specified index
    setTableData(updatedData);
  };


  const handleDeleteRow2 = (specId) => {
    deleteSpecificationData(specId, success => {
      if (success) {
        console.log('Deletion successful');
        getData();
      } else {
        console.log('Deletion failed');
      }
    });
  };

  // ====== arif end =====

  // =========== MAIN =============

  // const handleQtyChange = (index, text) => {
  //   const updatedCustomers = [...selectedCustomer];
  //   updatedCustomers[index] = {...updatedCustomers[index], ItemQty: text};
  //   setSelectedCustomer(updatedCustomers);
  // };

  // const handleMeasurementChange = (index, text) => {
  //   const updatedCustomers = [...selectedCustomer];
  //   updatedCustomers[index] = {...updatedCustomers[index], measurement: text};
  //   setSelectedCustomer(updatedCustomers);
  // };

  // const handleRemarksChange = (index, text) => {
  //   const updatedCustomers = [...selectedCustomer];
  //   updatedCustomers[index] = {...updatedCustomers[index], Remarks: text};
  //   setSelectedCustomer(updatedCustomers);
  // };

  // ======== template data fetch =========//
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



  // const saveDataToSQLite = () => {
  //   if (selectedCustomer.length > 0) {
  //     db.transaction(txn => {
  //       txn.executeSql(
  //         'SELECT * FROM specification_user',
  //         [],
  //         (tx, res) => {
  //           const existingData = [];
  //           const rows = res.rows;
  //           for (let i = 0; i < rows.length; i++) {
  //             existingData.push(rows.item(i));
  //             console.log(
  //               'this is local saved data',
  //               JSON.stringify(existingData, null, 2),
  //             );
  //           }

  //           // Update existing data with new values
  //           selectedCustomer?.forEach(customer => {
  //             const existingIndex = existingData.findIndex(
  //               existingEntry =>
  //                 existingEntry.designName === customer.designName,
  //             );
  //             if (existingIndex !== -1) {
  //               existingData[existingIndex] = {
  //                 ...existingData[existingIndex],
  //                 ...customer,
  //               };
  //             }
  //           });

  //           // Insert new data that doesn't already exist in the table
  //           const newData = selectedCustomer.filter(newEntry => {
  //             return !existingData.some(
  //               existingEntry =>
  //                 existingEntry.designName === newEntry.designName,
  //             );
  //           });
  //           newData.forEach(newEntry => {
  //             txn.executeSql(
  //               'INSERT INTO specification_user (designTemplateId, qty, designName, measurement, remarks) VALUES ( ?, ?, ?, ?, ?)',
  //               [
  //                 newEntry.designTemplateId,
  //                 newEntry.qty,
  //                 newEntry.designName,
  //                 newEntry.measurement,
  //                 newEntry.remarks,
  //               ],
  //               (_, insertRes) => {
  //                 if (insertRes.rowsAffected > 0) {
  //                   console.log('Data inserted successfully');
  //                 } else {
  //                   console.log('Failed to insert data');
  //                 }
  //               },
  //               error => {
  //                 console.log(error);
  //               },
  //             );
  //           });

  //           // Update the existing data in the table
  //           existingData.forEach(existingEntry => {
  //             txn.executeSql(
  //               'UPDATE specification_user SET designTemplateId=?, qty=?, measurement=?, remarks=? WHERE designName=?',
  //               [
  //                 existingEntry.designTemplateId,
  //                 existingEntry.qty,
  //                 existingEntry.measurement,
  //                 existingEntry.remarks,
  //                 existingEntry.designName,
  //               ],
  //               (_, updateRes) => {
  //                 if (updateRes.rowsAffected > 0) {
  //                   console.log('Data updated successfully');
  //                 } else {
  //                   console.log('Failed to update data');
  //                 }
  //               },
  //               error => {
  //                 console.log(error);
  //               },
  //             );
  //           });

  //           // Log the updated data
  //           txn.executeSql(
  //             'SELECT * FROM specification_user',
  //             [],
  //             (_, selectRes) => {
  //               const finalData = [];
  //               const selectRows = selectRes.rows;
  //               for (let i = 0; i < selectRows.length; i++) {
  //                 finalData.push(selectRows.item(i));
  //               }
  //               console.log(
  //                 'locally saved finalData 213',
  //                 JSON.stringify(finalData, null, 2),
  //               );
  //             },
  //             selectError => {
  //               console.log('Error fetching locally saved data:', selectError);
  //             },
  //           );
  //         },
  //         error => {
  //           console.log('Error fetching existing data:', error);
  //         },
  //       );
  //     });
  //   }
  // };

  //===== get data from sqlite local storage =====

  // const getData = () => {
  //   db.transaction(txn => {
  //     txn.executeSql('SELECT * FROM specification_user', [], (tx, res) => {
  //       var temp = [];
  //       for (let i = 0; i < res.rows.length; ++i) {
  //         console.log(res.rows.item(i));
  //         temp.push(res.rows.item(i));
  //       }
  //       setUserList(temp);
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  
  return (
    <ScrollView style={customStyle.container}>
      {/* Activity no */}
      <View style={{alignSelf: 'center', marginVertical: 10}}>
        <Text style={{color: '#000000', fontSize: 20}}>
          {/* Activity No: {deviceActivityId} */}
          Activity No: {devID}
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
          <Text style={styles.label}>Specification</Text>
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
              {/* {selectedItem.length > 0
                ? selectedItem[selectedItem.length - 1].designName
                : 'Enter Specification'} */}
              {selectedItem ? selectedItem.designName : 'select'}
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
                  keyExtractor={(item, index) => index.toString()}
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
                      onPress={() => {
                        setSelectedItem(item);
                        setClicked(!isClicked);
                        // addItemToTable();
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
          {/* {selectedCustomer.map((customer, index) => (
            <View style={styles.table_body}>
              
              <View style={{width: '15%'}}>
                
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
                    value={qty}
                    onChangeText={text => handleQtyChange(index, text)}
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
                    value={measurement}
                    onChangeText={text => handleMeasurementChange(index, text)}
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
                    value={remarks}
                    onChangeText={text => handleRemarksChange(index, text)}
                  />
                </View>
              </View>
            </View>
          ))} */}

          {tableData.map((customer, index) => (
            <View style={styles.table_body}>
              <View style={{width: '15%'}}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: '#ced4da',
                  }}
                  onPress={() => handleDeleteRow(index)}>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/delete.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>{customer.Name}</Text>
              </View>

              <View style={{width: '15%'}}>
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
                    value={customer.qty}
                    onChangeText={text => handleQtyChange(index, text)}
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
                    // keyboardType="numeric"
                    value={customer.measurement}
                    onChangeText={text => handleMeasurementChange(index, text)}
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
                    // keyboardType="numeric"
                    value={customer.remarks}
                    onChangeText={text => handleRemarksChange(index, text)}
                  />
                </View>
              </View>
            </View>
          ))}


{/* ======================= */}

{saveData.map((customer, index) => (
            <View style={styles.table_body}>
              <View style={{width: '15%'}}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: '#ced4da',
                  }}
                  onPress={() => handleDeleteRow2(customer.Spec_id)}>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={require('../../../assets/homeScreen/delete.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '25%'}}>
                <Text style={styles.table_data}>{customer.Name}</Text>
              </View>

              <View style={{width: '15%'}}>
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
                    value={customer.SpecQty}
                    onChangeText={text => handleQtyChange(index, text)}
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
                    // keyboardType="numeric"
                    value={customer.Measurement}
                    onChangeText={text => handleMeasurementChange(index, text)}
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
                    // keyboardType="numeric"
                    value={customer.Remarks}
                    onChangeText={text => handleRemarksChange(index, text)}
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
            // onPress={addItemToTable}

            onPress={() => handleSaveButtonClick()}>
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
