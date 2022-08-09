import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        en: {
            translation: {
              home: {
                detectfromsymptoms: 'Detect from Symptoms',
                detectusingcamera:'Detect using Camera',
                detectusingimage:'Detect using Image',
                pastdetections:'Past Detections',
                settings:'Settings',
                logout:'Logout'
              },
              auth:{
                login: 'Login',
                register: 'Register',
                donthaveaccount: 'Don\'t have account? ',
                email:'Email',
                password:'Password',
                fullname:'Full Name',
                alreadygotanaccount:'Already got an account? ',
                confirmpassword:'Confirm Password',
               

              }
            }
          },
          ur: {
            translation: {
                home: {
                    detectfromsymptoms: 'علامات سے پتہ لگائیں۔',
                    detectusingcamera:'کیمرہ استعمال کرکے پتہ لگائیں۔',
                    detectusingimage:'تصویر سے پتہ لگائیں۔',
                    pastdetections:'پیشن گوئیاں',
                    settings:'سیٹنگ',
                    logout:'لاگ آوٹ'
                  },
              auth:{
                login: 'لاگ ان کریں',
                register: 'رجسٹر کریں۔',
                donthaveaccount: 'اکاؤنٹ نہیں ہے؟ ',
                email:'ای میل',
                password:'پاس ورڈ',
                fullname:'پورا نام',
                alreadygotanaccount:'پہلے ہی اکاؤنٹ ہے؟ ',
                confirmpassword:'پاس ورڈ دوبارہ لکھیں'

              }
            },
            
            
          }
          
        }

  });

export default i18n;