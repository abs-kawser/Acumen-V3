import React, { createContext, useContext, useState } from 'react';
import i18n from '../Locales';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setLanguage] = useState('en');

//   const changeLanguage = (value) => {
//     // Your language change logic here
//     setLanguage(value);
//   };

const {i18n} = useTranslation();


  const handleLanguageChange = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.error('Error changing language:', err));
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
