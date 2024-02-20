import React, {useEffect} from 'react';
import AppNav from './src/Navigation/StackNavigation/AppNav';
import AuthProvider from './src/Context/AuthContext';
import DataProvider from './src/Context/DataContext';
import {useTranslation} from 'react-i18next';
import './src/Locales/index';
import {LanguageProvider} from './src/Context/LanguageProvider';

import {ToastProvider} from 'react-native-toast-notifications';
import CustomerProvider from './src/Context/CustomerProvider';

const App = () => {
  // const {t,i18n} = useTranslation();

  // const [currentLanguage,setLanguage] =useState('en');

  // const changeLanguage = value => {
  //   i18n
  //     .changeLanguage(value)
  //     .then(() => setLanguage(value))
  //     .catch(err => console.log(err));
  // };

  return (
    <>
      <AuthProvider>
        <DataProvider>
          <CustomerProvider>
            <LanguageProvider>
              <ToastProvider swipeEnabled={true} offset={50}>
                <AppNav />
              </ToastProvider>
            </LanguageProvider>
          </CustomerProvider>
        </DataProvider>
      </AuthProvider>
    </>
  );
};

export default App;
