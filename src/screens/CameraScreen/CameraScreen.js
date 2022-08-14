import {bundleResourceIO, decodeJpeg} from "@tensorflow/tfjs-react-native";
import React, { useEffect, useState, useRef  } from 'react'
import { FlatList, Keyboard, Text, TextInput,Button, TouchableOpacity, View, Image, ScrollView, StyleSheet } from 'react-native'

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
import Icon from "react-native-ionicons";


export default function CameraScreen(props) {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useState(null);

  const ref = useRef(null)
  //Loading model from models folder
  const modelJSON = require("../../../model/model.json");
  const modelWeights = require("../../../model/group1.bin");
 

  var [model, setModel] = useState(null);
  const [tfReady, setTfReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  var [isModelReady, setIsModelReady] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [imageToAnalyze, setImageToAnalyze] = useState(null);
  
  var [index, setIndex] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

    const { t, i18n } = useTranslation();
    

    const entityRef = firebase.firestore().collection('entities')
    const user = firebase.auth().currentUser;

    function toggleCameraType() {
      setType((current) => (
        current === CameraType.back ? CameraType.front : CameraType.back
      ));
    }
    
   
    
    

    useEffect(() => {
      
      console.log("useEffect..");
      (async () => {
        try {
          console.log("Model loading..");
        setIsModelLoading(true)
         model = await tf.loadLayersModel(
            bundleResourceIO(modelJSON, modelWeights)
          );
          setModel(model)
          setIsModelReady(true)
          console.log("Model loaded");
          setIsModelLoading(false)
        } catch (e) {
          console.log(e);
        }
      })();
      (async () => {
        await tf.ready();
        setTfReady(true);
      })();

      (async () => {
      await requestPermission(Camera.useCameraPermissions())
      if (!permission.granted) {
   
       // Camera permissions are not granted yet
       return (
         <View style={styles.container}>
           <Text style={{ textAlign: 'center' }}>
             We need your permission to show the camera
           </Text>
           <Button onPress={Camera.useCameraPermissions()} title="grant permission" />
         </View>
       );
     }
    })();
    
      
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
    const predictImageAsync = async () => {
      try {
       
        setIsPredicting(true)
        if(imageToAnalyze ){
          console.log(isModelReady)
          
          // resize image to avoid out of memory crashes
          const manipResponse = await ImageManipulator.manipulateAsync(
            imageToAnalyze.uri,
            [{ resize: { width: 64, height : 64 } }],
            {
              compress: 1,
              format: ImageManipulator.SaveFormat.JPEG,
              base64: true,
            }
          );
  
          console.log(manipResponse.uri)
          const source = { uri: manipResponse.uri };
          //setImageToAnalyze(source);
          setPredictions(null);
          //await classifyImageAsync(source);
          const b = Buffer.from(manipResponse.base64, "base64");
          //const imageData = new Uint8Array(manipResponse.base64);
          const imageTensor = decodeJpeg(b).expandDims(0);
          console.log(imageTensor)
          //const imageTensor = imageToTensor();
          const pred = await model.predict(imageTensor).data()
          // send base64 version to clarifai
          setPredictions(pred)
          console.log(pred);
          const max = Math.max.apply(null, pred);
          
          const index = pred.indexOf(max);
          setIndex(index)

          
          setIsPredicting(false)

          // send data to firebase

          props.navigation.navigate('Report', {
            index: index,
            predictions:pred,
          })

          
        }
      } catch (error) {
        console.log(error);
      }
    };

    async function snapPhoto() {       
      console.log('Button Pressed');
      
         console.log('Taking photo');
         const options = { quality: 1, base64: true, fixOrientation: true, 
         exif: true};
         await ref.current.takePictureAsync({ skipProcessing: true }).then(photo => {
            //photo.exif.Orientation = 1;            
             console.log(photo);   
             setImageToAnalyze(photo)         
             });     
  
      }
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
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
        {(!imageToAnalyze && isModelReady) &&
          <TouchableOpacity
            style={styles.button}
            onPress={snapPhoto}>
              
              
            <Text style={styles.text}>Capture Picture</Text>
          </TouchableOpacity>
}
          {(imageToAnalyze && isModelReady) &&
          <TouchableOpacity
          style={styles.button}
          onPress={predictImageAsync}>
          <Text style={ styles.text}>Predict Disease</Text>
          </TouchableOpacity>
}

        
        </View>
        {(!isModelReady || isPredicting) &&
           <AnimatedLoader
           visible={true}
           overlayColor="rgba(0,0,0,0.25)"
           source={require("../ImageScreen/loader.json")}
           animationStyle={styles.lottie}
           speed={1}
         ></AnimatedLoader>
}
      </Camera>
      
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    backgroundColor:'#b68873',
    borderRadius:20,
    marginRight:10,
    padding:10,
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});