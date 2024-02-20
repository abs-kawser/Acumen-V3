import React, {useContext, useState} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DotIcon from '../../assets/images/menu.svg';
import {syncdata} from '../Data/FetchData';
import {AuthContext} from '../Context/AuthContext';

const CustomHeaderRight = ({onDotButtonPress}) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const {login, userDetails} = isLoggedIn;

  const [showButton, setShowButton] = useState(false);

  const toggleButton = () => {
    setShowButton(!showButton);
    if (onDotButtonPress) {
      onDotButtonPress(!showButton); // Pass the current state to the parent component
    }
  };

  // data sync api call

  const handleClickSync = () => {
    // Call the syncdata function when the sync button is clicked
    syncdata(userDetails);
    setShowButton(!showButton);
  };

  return (
    <View>
      <TouchableOpacity
        style={{marginRight: 5, padding: 10, borderRadius: 50}}
        onPress={toggleButton}>
        <Icon name="bell" size={20} color="#fff" />

        {/* <DotIcon width={20} height={20} fill="#ffffff" /> */}
      </TouchableOpacity>

      {/* {showButton && (
        <View style={{position: 'absolute', top: 30, right: 10}}>
          <TouchableHighlight
            style={{
              paddingVertical: 15,
              backgroundColor: '#023e8a',
              width: 100,
              borderRadius: 5,
            }}
            onPress={handleClickSync}>
            <Text style={{color: '#fff', paddingLeft: 10}}>Sync Data</Text>
          </TouchableHighlight>
        </View>
      )} */}
    </View>
  );
};

export default CustomHeaderRight;
