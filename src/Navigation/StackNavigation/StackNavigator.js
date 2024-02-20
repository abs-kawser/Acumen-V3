import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DrawerNavigator from '../DrawerNavigation/DrawerNavigator';
import NewActivity from '../../Screens/NewActivity/NewActivity';
import SalesOrder from '../../Screens/HomePageComponent/SalesOrder';
import OrderDelivery from '../../Screens/HomePageComponent/OrderDelivery';
import Tailoring from '../../Screens/HomePageComponent/Tailoring';
import Items from '../../Screens/HomePageComponent/Items';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StartActivity from '../../Screens/HomePageComponent/StartActivity';
import ActivityCheck from '../../Screens/NewActivity/ActivityCheck';
import SalesOrderSearch from '../../Screens/SalesOrder/SalesOrderSearch';
import OrderStatus from '../../Screens/OrderDelivery/OrderStatus';
import ScannerScreen from '../../Components/HomePage/ScannerScreen';
import ActivitySummary from '../../Screens/NewActivity/ActivitySummary';
import OrderDetails from '../../Screens/OrderDelivery/OrderDetails';
import SalesOrderDetails from '../../Screens/SalesOrder/SalesOrderSummary';
import SalesOrderSummary from '../../Screens/SalesOrder/SalesOrderSummary';
import Appointments from '../../Screens/AppointmentScreen/Appointments';
import AppointmentStatus from '../../Screens/AppointmentScreen/AppointmentStatus';
import AppointmentSummary from '../../Screens/AppointmentScreen/AppointmentSummary';
import PhotoCapture from '../../PhotoCapture';
import ChangePassword from '../../Screens/ChangePassword/ChangePassword';
import AllActivity from '../../Screens/NewActivity/AllActivity';
import ActivityItems from '../../Screens/NewActivity/ActivityItems';
import ActivitySpecification from '../../Screens/NewActivity/ActivitySpecification';
import ActivityCustomer from '../../Screens/NewActivity/ActivityCustomer';
import DraftScreen from '../../Screens/Draft/DraftScreen';

// import DetailsScreen from '../../Components/HomePage/DetailsScreen';
// import RegularizationDraft from '../../Screens/Draft/RegularizationDraft';
// import LeaveDraft from '../../Screens/Draft/LeaveDraft';
// import LeaveApproval from '../../Screens/Leave/LeaveApproval';
// import AttendanceApproval from '../../Screens/AttendanceRegularization/AttendanceApproval';
// import CameraScreen from '../../Components/HomePage/CameraScreen';

// custom arrow button

const CustomBackArrow = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={{paddingHorizontal: 16}}>
        <Icon name="long-arrow-alt-left" color={'black'} size={16} />
      </View>
    </TouchableOpacity>
  );
};

const Stack = createNativeStackNavigator();

const StackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />

      {/* ======== New Activity ======== */}

      <Stack.Screen
        name="Start Activity"
        component={StartActivity}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="New Activity"
        component={NewActivity}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Activity Check"
        component={ActivityCheck}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Activity Items"
        component={ActivityItems}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Activity Specification"
        component={ActivitySpecification}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Activity Customer"
        component={ActivityCustomer}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Activity Summary"
        component={ActivitySummary}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="All Activity"
        component={AllActivity}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/* ======== Appointment ======== */}

      <Stack.Screen
        name="Appointment Screen"
        component={Appointments}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Appointment Status"
        component={AppointmentStatus}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Appointment Summary"
        component={AppointmentSummary}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/*======== Sales Order =======*/}
      <Stack.Screen
        name="Sales Order"
        component={SalesOrder}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Sales Order Search"
        component={SalesOrderSearch}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Sales Order Summary"
        component={SalesOrderSummary}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/*======== Order Delivery =========*/}
      <Stack.Screen
        name="Order Delivery"
        component={OrderDelivery}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Order Status"
        component={OrderStatus}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Order Details"
        component={OrderDetails}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/*======== Tailoring =========*/}
      <Stack.Screen
        name="Tailoring"
        component={Tailoring}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/*========= Items ========*/}
      <Stack.Screen
        name="Items"
        component={Items}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/*========= draft ========*/}
      <Stack.Screen
        name="Draft"
        component={DraftScreen}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/* scanner */}

      <Stack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/* change password */}
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/* photo capture */}
      <Stack.Screen
        name="Photo Captures"
        component={PhotoCapture}
        options={{
          headerTitleStyle: {
            fontSize: 16, // Change the title text style
            color: '#0D0D0D',
          },
          headerLeft: ({navigation}) => (
            <CustomBackArrow navigation={navigation} />
          ),
        }}
      />

      {/* <Stack.Screen name="camera" component={CameraScreen} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;

{
  /* <Stack.Screen
        name="New Activity"
        component={NewActivity}
        options={{
          headerStyle: {
            // backgroundColor: 'transparent',
            // elevation: 10,
          },
          headerTitleStyle: {
            fontSize: 15, // Change the title text style
            // fontWeight: 'bold',
          },
          // headerTransparent:true,
          headerShadowVisible: false,
          headerTintColor: 'black', // Change the color of the back arrow and title text
        }}
      /> */
}
