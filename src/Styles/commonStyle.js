import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('window').width;

const customStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding:8, 
    // padding: screen * 0.03, D1EBED f6fff8
    backgroundColor: '#FFFFFF',
   
  },

  // ===== loading screen ======
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    marginBottom: 50,
  },
});

export default customStyle;
