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
    const { onPressGameHub, gameHubScreenBtn = 'Game Hub' } = clickButton;

  return (
    <View style={styles.container}>
            {/*Linking back to index.js page*/}
            <Link href="/gamehub/gamehub_mainscreen" asChild>
                <Pressable style={styles.button} onPressGameHub={onPressGameHub}>
                    <Text style={styles.text}>{gameHubScreenBtn}</Text>
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
});