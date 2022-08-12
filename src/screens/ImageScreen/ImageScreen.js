import {bundleResourceIO, decodeJpeg} from "@tensorflow/tfjs-react-native";
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image, ScrollView, StyleSheet } from 'react-native'

import { firebase } from '../../firebase/config'
import camera from '../../../assets/camera.png'
import * as tf from "@tensorflow/tfjs";
import Box from '../../components/Box';
import { useTranslation, Trans } from 'react-i18next';
import { ImageBackground } from 'react-native-web';

import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
   

import * as jpeg from "jpeg-js";

export default function ImageScreen(props) {

  //Loading model from models folder
  const modelJSON = require("../../../model/model.json");
  const modelWeights = require("../../../model/group1.bin");
 

  var [model, setModel] = useState(null);
  const [tfReady, setTfReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  var [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [imageToAnalyze, setImageToAnalyze] = useState(null);
  
  var [index, setIndex] = useState(null);
    

    const { t, i18n } = useTranslation();
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const user = firebase.auth().currentUser;


     

    useEffect(() => {
      

      (async () => {
        try {
        
         model = await tf.loadLayersModel(
            bundleResourceIO(modelJSON, modelWeights)
          );
          setModel(model)
          setIsModelReady(true)
          console.log("Model loaded");
        } catch (e) {
          console.log(e);
        }
      })();
      (async () => {
        await tf.ready();
        setTfReady(true);
      })();


      const getPermissionAsync = async () => {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need gallery permissions to make this work!");
          }
        }
      };
      getPermissionAsync();
    }, []);

    // const classifyImageAsync = async (source) => {
    //   try {
    //     const imageAssetPath = Image.resolveAssetSource(source);
    //     const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
    //     const rawImageData = await response.arrayBuffer();
    //     console.log(rawImageData)
    //     const imageTensor = imageToTensor(rawImageData);
    //     const newPredictions = await model.current.classify(imageTensor);
    //     setPredictions(newPredictions);
    //   } catch (error) {
    //     console.log("Exception Error: ", error);
    //   }
    // };
    const selectImageAsync = async () => {
      try {
        let response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
        });
  
        if (!response.cancelled) {
          // resize image to avoid out of memory crashes
          const manipResponse = await ImageManipulator.manipulateAsync(
            response.uri,
            [{ resize: { width: 64, height : 64 } }],
            {
              compress: 1,
              format: ImageManipulator.SaveFormat.JPEG,
              base64: true,
            }
          );
  
          const source = { uri: manipResponse.uri };
          setImageToAnalyze(source);
          setPredictions(null);
          //await classifyImageAsync(source);
          const b = Buffer.from(manipResponse.base64, "base64");
          //const imageData = new Uint8Array(manipResponse.base64);
          const imageTensor = decodeJpeg(b).expandDims(0);
          
          //const imageTensor = imageToTensor();
          const pred = await model.predict(imageTensor).data()
          // send base64 version to clarifai
          setPredictions(pred)
          console.log(pred);
          const max = Math.max.apply(null, pred);
          
          const index = pred.indexOf(max);
          setIndex(index)
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    // useEffect(() => {
    //     (async () => {
    //       const { status } = await Camera.requestCameraPermissionsAsync();
    //       setHasPermission(status === "granted");
    //     })();
    //     (async () => {
    //       try {
    //        const model = await tf.loadLayersModel(
    //           bundleResourceIO(modelJSON, modelWeights)
    //         );
    //         console.log("Model loaded");
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     })();
    //     (async () => {
    //       await tf.ready();
    //       setTfReady(true);
    //     })();
    //     // console.log(isTFReady);
    //   }, []);

    return (
      <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.headerText}>{t('image.title')}</Text>

          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={isModelReady ? selectImageAsync : undefined}
          >
            {imageToAnalyze && (
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    zIndex: 0,
                    elevation: 0,
                  }}
                >
                  <Image
                    source={imageToAnalyze}
                    style={styles.imageContainer}
                  />
                </View>
              </View>
            )}

            {!imageToAnalyze && (
              <Text style={styles.transparentText}>{t('image.chooseimage')}</Text>
            )}
          </TouchableOpacity>
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
            
            {imageToAnalyze && (
              <Text style={styles.textHead}>
                Predictions: {predictions ? "" : "Predicting..."}
              </Text>
            )}

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

          {predictions &&
              predictions?.length &&
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