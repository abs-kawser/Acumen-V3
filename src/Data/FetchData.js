import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import {Base_Url, PASSWORD, USERNAME} from '../../variable';
import {ToastAndroid} from 'react-native';
// import axios from 'axios';
import moment from 'moment';

//============  Shop Tailor =============
export const handleShopTailor = async result => {
  try {
    const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
    const response = await fetch(
      // `${Base_Url}/Api/Tailor/TailorInfoByShop?EmpId=${result.empId}&CompanyId=${result.currentCompanyId}`,
      `${Base_Url}/Api/Tailor/ShopTailorInfoApi?EmpId=${result.empId}&CompanyId=${result.currentCompanyId}`,
      {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: authHeader,
        },
      },
    );
    const jsonData = await response.json();

    // console.log('this is shop tailor data', JSON.stringify(jsonData, null, 2));

    // await AsyncStorage.setItem('shopTailorData', JSON.stringify(jsonData));

    // Set data and filteredData states
    // setData(fetchedData);

    // setFilteredData(fetchedData);
    // setIsLoading(false);

    // return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    // setIsLoading(false);
    throw error;
  }
};

// =========== Employee List=============
export const handleShopEmployeeList = async userDetails => {
  try {
    const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
    const response = await fetch(
      // `${Base_Url}/Api/Tailor/TailorInfoByShop?EmpId=${result.empId}&CompanyId=${result.currentCompanyId}`,
      `${Base_Url}/api/Master/ShopEmployeesApi?EmpId=${userDetails.empId}`,
      {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: authHeader,
        },
      },
    );
    const jsonData = await response.json();
    return jsonData;
    // console.log('this is shop employee list tailor data', JSON.stringify(jsonData, null, 2));

    // await AsyncStorage.setItem('shopEmployeeList', JSON.stringify(jsonData));

    // Set data and filteredData states
    // setData(fetchedData);

    // setFilteredData(fetchedData);
    // setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    // setIsLoading(false);
    throw error;
  }
};

// =========== Design Template Shop =============
export const handleDesignTemplate = async result => {
  try {
    const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
    const response = await fetch(
      // `${Base_Url}/Api/Tailor/TailorInfoByShop?EmpId=${result.empId}&CompanyId=${result.currentCompanyId}`,
      `${Base_Url}/api/Master/DesignTemplateApi?EmpId=${result.empId}`,
      {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: authHeader,
        },
      },
    );
    const jsonData = await response.json();

    // console.log('this is design template data', JSON.stringify(jsonData, null, 2));

    // await AsyncStorage.setItem('designTemplate', JSON.stringify(jsonData));

    // Set data and filteredData states
    // setData(fetchedData);

    // setFilteredData(fetchedData);
    // setIsLoading(false);

    // return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    // setIsLoading(false);
    throw error;
  }
};
