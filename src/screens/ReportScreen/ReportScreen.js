import {bundleResourceIO, decodeJpeg} from "@tensorflow/tfjs-react-native";
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity,
    BackHandler, View, Image, ScrollView, StyleSheet } from 'react-native'

import { firebase } from '../../firebase/config'
import camera from '../../../assets/camera.png'
import * as tf from "@tensorflow/tfjs";
import Box from '../../components/Box';
import { useTranslation, Trans } from 'react-i18next';
import { ImageBackground } from 'react-native-web';

import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
   
import AnimatedLoader from "react-native-animated-loader";
import * as jpeg from "jpeg-js";

export default function ReportScreen(props) {

  //Loading model from models folder
  const modelJSON = require("../../../model/model.json");
  const modelWeights = require("../../../model/group1.bin");
 

 
  
  
  const index = props.route.params.index
  console.log(props.route.params.index)

  const predictions = props.route.params.predictions

    
    const { t, i18n } = useTranslation();


    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate('Home')
    
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    return (
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.headerText}>{t('image.title')}</Text>




          <View style={styles.predictionWrapper}>
 
          {predictions &&
              predictions?.length &&
              (<View><Text style={styles.textHead}>
              Prediction Result:
                </Text>
                <Text style={styles.text}>
                {t('image.chances0')}{Math.floor(predictions[index] * 100)} % {t('image.chances1')}
                </Text>
               
                {index == 0 &&
                <Text style={styles.textDisease}>
                
                {t('disease0.name')}
                </Text>
                }
                {index == 1 &&
                <Text style={styles.textDisease}>
                
                {t('disease1.name')}
                </Text>
                }
                {index == 2 &&
                <Text style={styles.textDisease}>
                
                {t('disease2.name')}
                </Text>
                }
              
                
                
                </View>)        
            }
            
           

            {predictions &&
              predictions?.length &&
              (<View><Text style={styles.text}>
               {t('disease0.name')} : {Math.floor(predictions[0] * 100)} %
                </Text>
                <Text style={styles.text}>
                {t('disease1.name')} : {Math.floor(predictions[1] * 100)} %
                </Text>
                
                <Text style={styles.text}>
                {t('disease2.name')} : {Math.floor(predictions[2] * 100)} %
                </Text>
                </View>)        
            }


          {index &&
              (<View>
                <View><Text style={styles.textHead}>
                {t('image.description')} :
                </Text>
                {index == 0 &&
                <Text style={styles.text}>
                
                {t('disease0.description')}
                </Text>
                }
                {index == 1 &&
                <Text style={styles.text}>
                
                {t('disease1.description')}
                </Text>
                }
                {index == 2 &&
                <Text style={styles.text}>
                
                {t('disease2.description')}
                </Text>
                }
                </View>

                <View><Text style={styles.textHead}>
               {t('image.symptoms')} :
                </Text>
                {index == 0 &&
                <Text style={styles.text}>
                
                {t('disease0.symptoms')}
                </Text>
                }
                {index == 1 &&
                <Text style={styles.text}>
                
                {t('disease1.symptoms')}
                </Text>
                }
                {index == 2 &&
                <Text style={styles.text}>
                
                {t('disease2.symptoms')}
                </Text>
                }
                </View>


                <View><Text style={styles.textHead}>
                {t('image.treatment')} :
                </Text>
                {index == 0 &&
                <Text style={styles.text}>
                
                {t('disease0.treatment')}
                </Text>
                }
                {index == 1 &&
                <Text style={styles.text}>
                
                {t('disease1.treatment')}
                </Text>
                }
                {index == 2 &&
                <Text style={styles.text}>
                
                {t('disease2.treatment')}
                </Text>
                }
                </View>


                <View><Text style={styles.textHead}>
                {t('image.medicine')} :
                </Text>
                {index == 0 &&
                <Text style={styles.text}>
                
                {t('disease0.medicine')}
                </Text>
                }
                {index == 1 &&
                <Text style={styles.text}>
                
                {t('disease1.medicine')}
                </Text>
                }
                {index == 2 &&
                <Text style={styles.text}>
                
                {t('disease2.medicine')}
                </Text>
                }
                </View>
               
                </View>)  
                
                
            }



          </View>
        </View>
      </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    
  },
  textDisease: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color:'#b68873',
   
    width:'90%',
    

  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color:'#b68873'
  },
  textHead: {
    fontWeight:"bold",
    marginTop:50,
    width:'90%',
    fontSize: 20,
    color:'#b68873',
    alignItems:"flex-start"
  },
  text: {
    marginTop:10,
    fontSize: 16,
    width:'90%',
    color:'white',
    alignItems:"flex-start"
  },
  lottie: {
    width: 100,
    height: 100
  },
  card: {
    
  },
  imageWrapper: {
    width: 300,
    height: 300,
    borderColor: "#b68873",
    borderWidth: 3,
    borderStyle: "dashed",
    marginTop: 40,
    marginBottom: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 280,
    height: 280,
  },
  predictionWrapper: {
    width: "100%",
    flexDirection: "column",
    marginStart:50
  
   
    
  },
  transparentText: {
    opacity: 0.8,
    color:'white'
  },
});