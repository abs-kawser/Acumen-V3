import {StyleSheet, View, Alert, ToastAndroid, Image, Text} from 'react-native';
import React, {useContext} from 'react';
import {Avatar, Title, Caption, Divider, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../Context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base_Url} from '../../../variable';
import Profile from '../../../assets/images/profile2.svg';
import CustomSwitch from '../../Screens/CustomSwitch/CustomSwitch';
import { useTranslation } from 'react-i18next';

const DrawerItems = props => {
  const navigation = useNavigation();
  const {isLoggedIn, setIsLoggedIn, setIsLoading} = useContext(AuthContext);

  const {login, userDetails} = isLoggedIn;

  const {t,i18n} = useTranslation();

  // logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            setIsLoading(true);

            await AsyncStorage.removeItem('userData');
            setIsLoggedIn(prevUserDetails => ({
              ...prevUserDetails,
              login: false,
              userDetails: '',
            }));

            setIsLoading(false);

            ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
            // navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1,backgroundColor:"#2358E13D"}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* drawer image */}
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'column'}}>
              {/* <Avatar.Image
                // source={require('../../../assets/images/dummy.jpg')}
                source={
                  userDetails.ImageTitle !== null
                    ? {uri: `${Base_Url}${userDetails.ImagePath}${userDetails.ImageTitle}`}
                    : require('../../../assets/images/dummy.jpg')
                }
                size={45}
                
              /> */}

              <View style={styles.imageContainer}>
                {/* <Image
                  // source={
                  //   userDetails.ImageTitle !== null
                  //     ? {
                  //         uri: `${Base_Url}${userDetails.ImagePath}${userDetails.ImageTitle}`,
                  //       }
                  //     : require('../../../assets/images/dummy.jpg')
                  // }

                  source={require('../../../assets/images/dummy.jpg')}


                  style={styles.profileImg}
                /> */}

                <View style={styles.profileImg}>
                  <Profile width={70} height={70} />
                </View>
              </View>

              

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                {/* <Title style={styles.title}>Hello,</Title> */}
                <Caption style={[styles.caption, {flexWrap: 'wrap'}]}>
                  {isLoggedIn.userDetails
                    ? isLoggedIn.userDetails.fullName
                    : ''}
                </Caption>
              </View>
            </View>

          </View>

          <View style={{alignSelf:"flex-end",paddingHorizontal:10}}>
                <CustomSwitch />
            </View>

          {/* =====drawer content==== */}

          <Drawer.Section style={styles.drawerSection} showDivider={false}>
            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/home.png')}
                />
              )}
              // label="Home"
              label={t('navigation.Home')}

              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />

            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/Activity.png')}
                />
              )}
              // label="New Activity"
              label={t('navigation.New Activity')}



              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('New Activity');
              }}
            />

            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/shopping.png')}
                />
              )}
              // label="Sales Order"
              label={t('navigation.Sales Order')}

              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('Sales Order');
              }}
            />

            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/box.png')}
                />
              )}
              // label="Order Delivery"
              label={t('navigation.Order Delivery')}

              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('Order Delivery');
              }}
            />

            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/tailor.png')}
                />
              )}
              // label="Tailoring"
              label={t('navigation.Tailoring')}

              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('Tailoring');
              }}
            />

            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/items.png')}
                />
              )}
              // label="Items"
              label={t('navigation.Items')}

              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('Items');
              }}
            />

            {/* change password */}
            <DrawerItem
              icon={() => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../../../assets/homeScreen/reset-password.png')}
                />
              )}
              label="Change Password"
              // label={t('navigation.Items')}

              labelStyle={{color:"#343a40",fontSize:15}}
              onPress={() => {
                props.navigation.navigate('Change Password');
              }}
            />

            {/* <Divider /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection} showDivider={false}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="logout" color={"white"} size={size} />
          )}
          // label="Logout"
          label={t('navigation.Logout')}
          labelStyle={{color:"white"}}
          onPress={handleLogout}
          style={{backgroundColor:"#739AFF",elevation:5}}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerItems;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20, a9d6e5
    // backgroundColor: '#f8f9fa',

    // backgroundColor: '#edf2f4',
    marginTop: -4,
  },
  title: {
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    // lineHeight: 15,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#168aad',
    marginVertical:5
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    // marginTop: -5,
    marginTop:40
    
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    // borderTopWidth: 1,
    
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  // image

  imageContainer: {
    alignSelf: 'center',
    marginTop:25,
    // padding: 3,
  },

  profileImg: {
    // height: 70,
    // width: 70,
    // resizeMode: 'contain',
    // alignItems: 'center',
    // justifyContent: 'center',
    // display: 'flex',

    borderWidth: 2,
    borderColor: '#6096ba',
    borderRadius: 10,
    overflow: 'hidden',
    // position:"absolute"
  },
});
