import React from 'react';
import {  View, ActivityIndicator, StyleSheet,Text } from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="green" />
          <Text style={{color:"black"}}> Submitting </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    flexDirection:"row",
    gap:5
  },
});

export default LoadingModal;