
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase';
import { LoginScreen, HomeScreen, RegistrationScreen, LanguageScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { color } from 'react-native-reanimated';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }



import './i18n';
import { useTranslation, Trans } from 'react-i18next';
import ImageScreen from './src/screens/ImageScreen/ImageScreen';
import { AppRegistry } from 'react-native-web';
import CameraScreen from './src/screens/CameraScreen/CameraScreen';
import ReportScreen from './src/screens/ReportScreen/ReportScreen';


const Stack = createStackNavigator();


export default function App() {

  const { t } = useTranslation();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const lngs = {
    en: { nativeName: 'English' },
    ur: { nativeName: 'Urdu' }
  };

  

  useEffect(() => {
    
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#242424',
    },
  };


  
  
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
      
      screenOptions={{
        headerStyle: {
          backgroundColor: '#b68873',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        
        <Stack.Screen name="Select Language" component={LanguageScreen} />
      
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        
        <Stack.Screen name="Home">
            {props => <HomeScreen {...props}  />}
        </Stack.Screen>

        <Stack.Screen name="Image" component={ImageScreen} options={{
          title: 'Prediction from Image', //Set Header Title
          headerStyle: {
            backgroundColor: '#b68873', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}/>
        <Stack.Screen name="Camera" component={CameraScreen}
        options={{
          title: 'Prediction using Camera', //Set Header Title
          headerStyle: {
            backgroundColor: '#b68873', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }} />

<Stack.Screen name="Setting" component={ReportScreen} />
<Stack.Screen name="History" component={ReportScreen} />

        <Stack.Screen name="Report" component={ReportScreen} />
        
       
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
