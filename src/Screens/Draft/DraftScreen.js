import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {deleteDraftData, getDraftData} from '../../Database/DraftTable';

const DraftScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [draftData, setDraftData] = useState(null);

  console.log('draft from draft screen', JSON.stringify(draftData, null, 2));

  useEffect(() => {
    getDraftallData();
  }, [isFocused]);

  const getDraftallData = () => {
    getDraftData(item => setDraftData(item));
  };

  //   delete data

  const handleDeleteItem = id => {
    deleteDraftData(id, success => {
      if (success) {
        // Refresh data after deletion
        getDraftallData();
        // Show success message
        Alert.alert('Success', 'Item deleted successfully');
      } else {
        // Show error message if deletion fails
        Alert.alert('Error', 'Failed to delete item');
      }
    });
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      {draftData?.map((item, index) => (
        <View style={styles.contents} key={index}>
          <View style={styles.leaveDetails}>
            {/* <View style={styles.leaveContent}>
              <Text style={styles.contentTxt}>Draft ID</Text>
              <Text style={styles.contentTxt2}>{item.Draft_id}</Text>
            </View> */}

            <View style={styles.leaveContent}>
              <Text style={styles.contentTxt}>DeviceActivityID</Text>
              <Text style={styles.contentTxt2}>{item.DeviceActivityId}</Text>
            </View>

            <View style={styles.leaveContent}>
              <Text style={styles.contentTxt}>CustomerId</Text>
              <Text style={styles.contentTxt2}>{item.CustomerId}</Text>
            </View>

            <View style={styles.leaveContent}>
              <Text style={styles.contentTxt}>EntryBy</Text>
              <Text style={styles.contentTxt2}>{item.ActivityBy}</Text>
            </View>

            <View style={styles.leaveContent}>
              <Text style={styles.contentTxt}>ActivityStartTime</Text>
              <Text style={styles.contentTxt2}>{item.ActivityStartTime}</Text>
            </View>
          </View>

          {/* button */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleDeleteItem(item.Draft_id)}>
              <Icon name="trash" color={'#e63946'} size={15} />
              {/* <Text style={styles.buttonText2}>arif</Text> */}
              <Text style={{fontWeight: 'bold', color: '#000000'}}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('All Activity', {value: item})
              }>
              <Icon name="user-edit" color={'#2d6a4f'} size={15} />
              <Text style={{fontWeight: 'bold', color: '#000000'}}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default DraftScreen;

const styles = StyleSheet.create({
  contents: {
    backgroundColor: 'white',
    borderRadius: 10,
    backgroundColor: 'rgba(100,223,223,0.2)',
    marginVertical: 10,
  },
  leaveContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
  },

  leaveDetails: {
    padding: 10,
  },
  contentTxt: {
    color: '#1d2d44',
    flex: 1,
    fontWeight: '700',
    lineHeight: 25,
    // textAlign:"justify"
  },

  contentTxt2: {
    color: '#1d2d44',
    flex: 1,
    fontWeight: '500',
    lineHeight: 25,
    // textAlign:"justify"
  },

  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:100,
    // height:"50%",
  },
  button: {
    width: '50%', // Set width to 50% of screen width
    backgroundColor: 'rgba(16,69,29,0.2)',
    padding: 5,
    borderBottomRightRadius: 10,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  button2: {
    width: '50%', // Set width to 50% of screen width
    backgroundColor: '#ffc8dd',
    padding: 10,
    borderBottomLeftRadius: 10,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
