import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
export default function Page() {
  return (
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
    height: 250,
    width: 450,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    gap: 75,
    
  },

  answers: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 15,
    height: 250,
    width: 450,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
  

});