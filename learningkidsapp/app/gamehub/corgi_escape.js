import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

export default function Page() {

  const increaseNum = 10;

  const [score, setScore] = useState(0);
  const incrementScore = () => {
    setScore(score + increaseNum);
  };

  const [health, setHealth] = useState(3);
  const decrementHealth = () => {
    setHealth(prevHealth => Math.max(prevHealth - 1, 0));
  };






  return (
    <SafeAreaView style={styles.container}>

      <Link href="/" asChild>
        <Pressable style={styles.button}>
            <Text>Back To Index</Text>
        </Pressable>
      </Link>


      <View style={styles.hearts}>
        <Image source={require('../../assets/heartIcon.png')}/>
        <Image source={require('../../assets/heartIcon.png')}/>
        <Image source={require('../../assets/heartIcon.png')}/>
      </View>

      <View style = {styles.healthTest}>
        <Text>(Testing Purposes) Health: {health}</Text>
      </View>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.questionArea}>
        <TextInput style={styles.questions} placeholder='Questions will go here'></TextInput>
      </View>

      

      <View style={styles.answerArea}>
        <TextInput style={styles.answers} placeholder='Answers'></TextInput>
        <TextInput style={styles.answers} placeholder='Answers'></TextInput>
        <TextInput style={styles.answers} placeholder='Answers'></TextInput>
      </View>

      <View style= {styles.testArea}>
        <Pressable style={styles.button} onPress={incrementScore}>
            <Text>Increment Score</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={decrementHealth}>
            <Text>Decrement Health</Text>
        </Pressable>
      </View>
      
    <View style = {styles.hintArea}>
    <Image source={require('../../assets/games/hint2x.png')}/>
    <Image source={require('../../assets/games/hint2x.png')}/>
    <Image source={require('../../assets/games/hint2x.png')}/>


    </View>

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  healthTest: {
    alignSelf: 'flex-end',

  },
  
  testArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',


  },
  
  hintArea:
  {
    width: '100%',
    height: '33%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    marginBottom: 50,
    alignItems: 'flex-end',

  },



  
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 16, // Padding around the container
    backgroundColor: '#A7C7E7',
    
  },

  hearts: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'right',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
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
    alignContent: 'center',
    alignItems: 'center',
    height: 250,
  },

  answerArea: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
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
    fontSize: 12,
    fontFamily: 'EBGaramond_800ExtraBold'
},


});