import React from 'react';
import { Pressable, Text, View,Image, StyleSheet} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';



export default function Button(clickButton) {

    {/*loading fonts here */}
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,EBGaramond_800ExtraBold
    });
    if (!fontsLoaded) {
        return null;
      }

    {/*Buttons for screens*/}
    const { onPressGamehub, gamehubScreenBtn = 'gamehub/gamehub_mainscreen' } = clickButton;

  return (
    
    <View style={styles.container}> 

      <Text style={styles.text}>
      HOW TO PLAY CORGI ESCAPE:
      </Text>
      <Text style={styles.text}>
      Your corgi is stuck in the park!</Text>
      <Text style={styles.text}>
      You are given seven questions. Answer each question to escape! </Text>
      <Text style={styles.text}>
      The more answers you get correct, the more your XP goes up! </Text>
      <Text style={styles.text}>
      You only have 3 lives, good luck! </Text>

      <Image style={styles.tutorialimage} source={require('../../assets/corgiescapetutorial.png')} resizeMode="contain"></Image>
    
      <Link href="gamehub/gamehub_mainscreen" asChild>
                <Pressable style={styles.gamehubButton} onPressGamehub={onPressGamehub}>
                    <Text style={styles.text}>Back to Gamehub</Text>
                </Pressable>
            </Link>
    
    
    </View>

  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns items to the top
    alignItems: 'center',          // Centers items horizontally   
  backgroundColor: '#A7C7E7',
},
text: {
  color: '#000000',
  fontSize: 16,
  fontFamily: 'EBGaramond_800ExtraBold',
  marginTop: 20, // Adjusts distance between image and text
  textAlign: 'center', // Centers the text itself
  marginBottom: 20,
},
tutorialimage: {
    width: 450,     // Set the width of the image
    height: 450,
},
gamehubButton:{
        width: 175, // Set a fixed width or use maxWidth
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10, 
        alignItems: 'center'
},
});