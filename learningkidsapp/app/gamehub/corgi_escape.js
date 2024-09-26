import React from 'react';
import { Pressable, Text, View, StyleSheet,Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';

export default function corgi_escape() {

  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }


  //frontend
  return (
   <View style={styles.container}>
    <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>

    <Text style={styles.title}>Welcome, !</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',       
  ...StyleSheet.absoluteFillObject
},
background: {
  ...StyleSheet.absoluteFillObject,
  width: '100%',
  height: '100%',
},
text: {
  color: '#000000',
  fontSize: 16,
  fontFamily: 'EBGaramond_800ExtraBold',
},
title: {
  fontSize: 30,
  textAlign: 'center',
  marginBottom: 20,
  fontFamily: 'EBGaramond_800ExtraBold',
},
});