import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useLanguage } from '../../Context/LanguageProvider';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { currentLanguage, handleLanguageChange } = useLanguage();

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);

     // Log 'bd' if enabled, 'en' otherwise
    //  console.log(isEnabled ? 'en' : 'bd');

    if (isEnabled) {
        handleLanguageChange('en')
    } else {
        handleLanguageChange('bd')
    }
  };

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <View
        style={[
          styles.switchContainer,
          isEnabled && styles.switchContainerActive,
        ]}>
        {isEnabled ? (
          <>
            <View style={[styles.switchHandle, styles.switchHandleActive]}>
              <Text style={styles.switchTextActive}>বাং</Text>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.switchHandle, styles.switchHandleInactive]}>
              <Text style={styles.switchTextInactive}>EN</Text>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50, // Increased width to accommodate both text elements
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 72, 0, 0.1)',
    justifyContent: 'center',
    paddingHorizontal: 5,
    // margin: 100,

    borderWidth: .5,
    borderColor: '#ff4800',
  },
  switchContainerActive: {
    // backgroundColor: '#4CAF50',
  },
  switchHandle: {
    width: 22,
    height: 22,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 208, 0, 0.7)',
  },
  switchHandleActive: {
    transform: [{ translateX: 10 }],

    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  switchHandleInactive: {
    transform: [{ translateX: -10 }],
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  switchTextActive: {
    color: '#000',
    fontSize: 10,
    alignSelf: 'center',
    fontWeight:"700",
    // fontFamily:"Potro-Bold"
  },
  switchTextInactive: {
    color: '#000',
    fontSize: 10,
    alignSelf: 'center',
    fontWeight:"700"
  },
});

export default CustomSwitch;
