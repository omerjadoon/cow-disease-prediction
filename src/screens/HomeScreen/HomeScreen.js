import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import camera from '../../../assets/camera.png'

import Box from '../../components/Box';
import { useTranslation, Trans } from 'react-i18next';
import { ImageBackground } from 'react-native-web';

export default function HomeScreen(props) {

    const { t, i18n } = useTranslation();
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const user = firebase.auth().currentUser;


    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            props.navigation.navigate('Login')
        } catch (e) {
            console.log(e);
        }
    }
 
    const goToImageScreen = () => {
        
            props.navigation.navigate('Image')
        
    }

    const goToCameraScreen = () => {
        
        props.navigation.navigate('Camera')
    
}

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>


            </View>
        )
    }

    return (
        <View style={styles.container}>
            
   
            <View style={styles.formContainer}>
            <View>

           
            <Text style={styles.toptext}>Welcome, {user.displayName} {user.email}</Text>
            
            </View>
          
            </View>

            <View style={styles.mainContainer}>
                
                <Box title={t('home.detectfromsymptoms')} imgpath='1'></Box>
                <Box title={t('home.detectusingcamera')} onPress={goToCameraScreen} imgpath='2'></Box>
                <Box title={t('home.detectusingimage')} onPress={goToImageScreen} imgpath='3'></Box>
                <Box title={t('home.pastdetections')} imgpath='4'></Box>
                <Box title={t('home.settings')} imgpath='5'></Box>
                <Box title={t('home.logout')} onPress={signOutUser} imgpath='6'></Box>
                

            </View>

           

        </View>
    )
}