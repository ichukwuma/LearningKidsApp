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
    const { onPressProfile, profileScreenBtn = 'Profile' } = clickButton;

  return (
    <View style={styles.container}>

            <Text>HOME SCREEN</Text>

            {/*Linking back to index.js page*/}
            <Link href="/" asChild>
                <Pressable style={styles.indexButton} onPressIndex={onPressIndex}>
                    <Text style={styles.text}>{indexScreenBtn}</Text>
                </Pressable>
            </Link>

            {/*Linking back to profile screen*/}
            <Link href="/home/profile" asChild>
                <Pressable style={styles.button} onPressProfile={onPressProfile}>
                    <Text style={styles.text}>{profileScreenBtn}</Text>
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
button: {
  width: 200, // Set a fixed width or use maxWidth
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center'
},
indexButton:{
    backgroundColor: '#FAC898',
    width: 200, 
    padding: 10,
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },
});