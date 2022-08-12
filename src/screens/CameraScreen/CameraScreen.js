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

export default function CameraScreen(props) {

  //Loading model from models folder
  const modelJSON = require("../../../model/model.json");
  const modelWeights = require("../../../model/group1.bin");
 

  var [model, setModel] = useState(null);
  const [tfReady, setTfReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  var [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [imageToAnalyze, setImageToAnalyze] = useState(null);
  
  
    

    const { t, i18n } = useTranslation();
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const user = firebase.auth().currentUser;


    const imageToTensor = (rawImageData) => {
      const { width, height, data } = jpeg.decode(rawImageData, {
        useTArray: true,
      }); // return as Uint8Array
  
      // Drop the alpha channel info for mobilenet
      const buffer = new Uint8Array(width * height * 3);
      let offset = 0; // offset into original data
      for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];
  
        offset += 4;
      }
  
      return tf.tensor3d(buffer, [height, width, 3]);
    };

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
            [{ resize: { width: 224, height : 224 } }],
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
          <Text style={styles.headerText}>Cow Disease Prediction</Text>
          <Camera
    style={{flex: 1,width:"100%"}}
    ref={(r) => {
    camera = r
    }}
    ></Camera>

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
              <Text style={styles.transparentText}>Tap to choose image</Text>
            )}
          </TouchableOpacity>
          <View style={styles.predictionWrapper}>
            {imageToAnalyze && (
              <Text style={styles.text}>
                Predictions: {predictions ? "" : "Predicting..."}
              </Text>
            )}

            {predictions &&
              predictions?.length &&
              (<Text><Text style={styles.text}>
              Foot-and-mouth disease : {Math.ceil(predictions[0] * 100)} %
                </Text>
                <Text style={styles.text}>
              Infectious Bovine Keratoconjunctivitis : {Math.ceil(predictions[1] * 100)} %
                </Text>
                
                <Text style={styles.text}>
              lysergic acid diethylamide : {Math.ceil(predictions[2] * 100)} %
                </Text>
                </Text>)

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
  text: {
    marginTop:20,
    fontSize: 16,
    color:'white'
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
    alignItems: "center",
    
  },
  transparentText: {
    opacity: 0.8,
  },
});