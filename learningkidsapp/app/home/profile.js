import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
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
    const { onPressIndex, indexScreenBtn = 'Index.Js' } = clickButton;
    const { onPressHome, homeScreenBtn = 'Home' } = clickButton;

  return (
    <View style={styles.container}>

            <Text>Profile</Text>

            {/*Linking back to index.js page*/}
            <Link href="/" asChild>
                <Pressable style={styles.indexButton} onPressIndex={onPressIndex}>
                    <Text style={styles.text}>{indexScreenBtn}</Text>
                </Pressable>
            </Link>

            {/*Linking back to home screen*/}
            <Link href="/home/home" asChild>
                <Pressable style={styles.button} onPressHome={onPressHome}>
                    <Text style={styles.text}>{homeScreenBtn}</Text>
                </Pressable>
            </Link>

    </View>

  );
}

const styles = StyleSheet.create({
container: {
  justifyContent: 'center',
  alignItems: 'center',       
  backgroundColor: '#A7C7E7',
},
indexButton:{
  backgroundColor: '#FAC898',
  width: 200, 
  padding: 10,
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center'
},
button: {
    width: 200, // Set a fixed width or use maxWidth
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },
});