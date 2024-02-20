import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import bd from './bd.json'

const resources = {
  en: {
    translation: en,
  },
  bd: {
    translation: bd,
  },
};

// i18n.use(initReactI18next).init({
//   resources,
//   lng: 'en',
//   fallbackLng: 'bd',
//   compatibilityJSON: 'v3',
//   interpolation: {
//     escapeValue: false
//   }
// });



i18n.use(initReactI18next).init({ 
  lng: 'en', 
  fallbackLng: 'en', 
  compatibilityJSON: 'v3',
  // resources: { 
  //   en: en, 
  //   bd: bd, 
    
  // }, 

  resources,

  interpolation: { 
    escapeValue: false // react already safes from xss 
  },
  
}); 

// export default index; 