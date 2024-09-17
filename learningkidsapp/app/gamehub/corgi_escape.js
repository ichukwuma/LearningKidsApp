import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

export default function Page(clickButton) {
  const { onPressIndex, indexScreenBtn = 'Index.js' } = clickButton;

  return (
    <SafeAreaView style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.button} onPressIndex={onPressIndex}></Pressable>
        </Link>
      <View style={styles.hearts}>
        <Image source={require('../../assets/heartIcon.png')}style= {{alignItems: 'flex-start'}}/>
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


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 16, // Padding around the container
    backgroundColor: '#A7C7E7',
    
  },

  hearts: {
    flexDirection: 'row',
    justifyContent: 'right',
    gap: 5,
    alignItems: 'right',
  },

  score: {
    flexDirection: 'row',
    justifyContent: 'right',
  },

  scoreText:{
    fontSize: 25,
  },

  questions:{
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'baseline',
    alignContent: 'center',
    borderRadius: 15,
    height: "90%",
    width: "90%",
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  questionArea:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    height: 250,
  },

  answerArea: {
    //display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 5,
    
  },

  answers: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 15,
    //height: 250,
    //width: 450,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },

  button: {
    width: 200, // Set a fixed width or use maxWidth
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },

  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold'
},


});