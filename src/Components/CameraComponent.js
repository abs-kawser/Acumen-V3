import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';

const CameraComponent = ({isActive, onCodeScanned}) => {
  const device = useCameraDevice('back');

  const format = useCameraFormat(device, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-39'],
    onCodeScanned,
  });

  if (!isActive || !device) {
    return null;
  }

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      codeScanner={codeScanner}
      //   format={format}
      
    />
  );
};

export default CameraComponent;
