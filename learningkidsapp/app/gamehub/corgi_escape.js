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
  },
  questionArea:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },

  

});