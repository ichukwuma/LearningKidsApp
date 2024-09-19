import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
//import Physics from '../physics';
//i still can not get entities to work
import Bird from "../components/Bird"
import Physics from '../physics';



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

  return (
    <View style={styles.container}>

    {/*Game engine takes in the systems -> physics engine and entities */}
      <GameEngine
      system = {[Physics]}
      entities={entities()}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>

      </GameEngine>



    {/*To hide the status bar set hidden= true */}
    
    <StatusBar style="auto" hidden={true} />

            



    </View>

  );
}

const styles = StyleSheet.create({
container: {
  justifyContent: 'center',
  alignItems: 'center',       
  backgroundColor: '#A7C7E7',
  flex: 1,
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