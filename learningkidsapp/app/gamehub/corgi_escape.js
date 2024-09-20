
import { Alert, Button, Image, ImageBackground, Modal, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

export default function Page() {
  return (
    <ImageBackground source={require('../../assets/CorgiEscapeBG.png')} style={styles.background}>
    <SafeAreaView style={styles.container}>

      <View style={styles.hearts}>
        <Image source={require('../../assets/heartIcon.png')}style= {{alignItems: 'flex-end'}}/>
        <Image source={require('../../assets/heartIcon.png')}style= {{alignItems: 'flex-end'}}/>
        <Image source={require('../../assets/heartIcon.png')}style= {{alignItems: 'flex-end'}}/>
      </View>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Score: 0</Text>
      </View>

      <View style={styles.questionArea}>
        <TextInput style={styles.questions} placeholder='Questions will go here'></TextInput>
      </View>

      <View style={styles.answerArea}>
        <TextInput style={styles.answers} placeholder='Answers will go here'></TextInput>
        <TextInput style={styles.answers} placeholder='Answers will go here'></TextInput>
        <TextInput style={styles.answers} placeholder='Answers will go here'></TextInput>
      </View>
      


    </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 16, // Padding around the container
    background: '#A7C7E7',
    
  },

  hearts: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },

  score: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  scoreText:{
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
  },

  questions:{
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'baseline',
    alignContent: 'center',
    borderRadius: 15,
    height: 200,
    width: 400,
    justifyContent: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'EBGaramond_800ExtraBold',
  },

  questionArea:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  answerArea: {
    //display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    gap: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },

  answers: {
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 15,
    height: 100,
    width: 400,
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
});