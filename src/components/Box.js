import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native';

import Images from '../images'

export default function Box({title,onPress,imgpath}) {
    
    var imgg = '';
    const boxstyle = StyleSheet.create({
    
    box:{
        width:'50%',
        height:'30%',
        padding:5,
        borderRadius: 5,
        
        


    },
    inner:{
        flex:1,
        borderRadius:9,
        backgroundColor:'#b68873',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'white',
        marginTop:25
    },
    img:{
        width:80,
        height:80
    }

});

if (imgpath == '1') {
    imgg =  <Image
    style={boxstyle.img}
    defaultSource={require('../../assets/icon.png')}
    source={Images.image1}
/>
  } else if(imgpath == '2') {
    imgg =  <Image
    style={boxstyle.img}
    defaultSource={require('../../assets/icon.png')}
    source={Images.image2}
/>
  }
  else if(imgpath == '3') {
    imgg =  <Image
    style={boxstyle.img}
    defaultSource={require('../../assets/icon.png')}
    source={Images.image3}
/>
  }
  else if(imgpath == '4') {
    imgg =  <Image
    style={boxstyle.img}
    defaultSource={require('../../assets/icon.png')}
    source={Images.image4}
/>
  }
  else if(imgpath == '5') {
    imgg =  <Image
    style={boxstyle.img}
    defaultSource={require('../../assets/icon.png')}
    source={Images.image5}
/>
  }
  else if(imgpath == '6') {
    imgg =  <Image
    style={boxstyle.img}
    defaultSource={require('../../assets/icon.png')}
    source={Images.image6}
/>
  }

    return (
        <TouchableOpacity style={boxstyle.box} onPress={onPress} >
        
            <View style={boxstyle.inner}>
                
                {imgg}
                <Text style={boxstyle.text} >{title}</Text>
            </View>
        
        </TouchableOpacity>
    )
}