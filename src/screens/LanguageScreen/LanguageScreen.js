import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firebase from 'firebase';
import { useTranslation, Trans } from 'react-i18next';




const lngs = {
    en: { nativeName: 'English' },
    ur: { nativeName: 'Urdu' }
  };


export default function LanguageScreen({navigation}) {
    const { t, i18n } = useTranslation();

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
   
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <View style={styles.title}>

                    <Text style={styles.title}>
                        Please Select your language
                    </Text>
          {Object.keys(lngs).map((lng) => (
            <TouchableOpacity style={{backgroundColor: '#b68873',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            width:'90%',
            height: 48,
            borderRadius: 5,
            color:'white',
            alignItems: "center",
            justifyContent: 'center'}} onPress={() => {
                i18n.changeLanguage(lng)
                navigation.navigate('Login')
            
            }} key={lng}  type="submit" >
             <Text style={styles.title}> {lngs[lng].nativeName} </Text>
            </TouchableOpacity>
          ))}
        </View>

        
                
                
            </KeyboardAwareScrollView>
        </View>
    )
}