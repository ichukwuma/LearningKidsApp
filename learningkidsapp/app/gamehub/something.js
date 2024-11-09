import { Alert, Button, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, Modal, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { Questions } from '../config/questions';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { database } from '../config/firebaseConfig'; // Your Firebase config
import { ref, onValue } from 'firebase/database';
import { auth } from '../config/firebaseConfig';
import { isNewBackTitleImplementation } from 'react-native-screens';
// Other imports...

export default function Page() {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [questionNumber, setQuestionNumber] = useState(1);
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [selectedIncorrectAnswers, setSelectedIncorrectAnswers] = useState([]);

    const getRandomQuestion = (contact) => {
        const randomQuestion = Questions[Math.floor(Math.random() * Questions.length)];
        const formattedQuestion = randomQuestion.question.replace('{name}', contact.name);
        return { formattedQuestion, key: randomQuestion.key };
    };

    useEffect(() => {
        const fetchContacts = async () => {
            // Fetching contacts logic
            // When a question is generated, shuffle answers and set them in `shuffledAnswers`
            if (loadedContacts.length > 0) {
                const randomContact = loadedContacts[Math.floor(Math.random() * loadedContacts.length)];
                const questionData = getRandomQuestion(randomContact);
                const correctAnswer = randomContact[questionData.key] || '';

                setCurrentQuestion(questionData.formattedQuestion);
                setAnswer(correctAnswer);

                const incorrectAnswers = loadedContacts
                    .filter(contact => contact.key !== randomContact.key)
                    .map(contact => contact[questionData.key])
                    .filter(item => item && item !== correctAnswer);

                // Randomly select 2 incorrect answers
                const selectedIncorrectAnswers = [];
                while (selectedIncorrectAnswers.length < 2 && incorrectAnswers.length > 0) {
                    const randomIncorrect = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
                    if (!selectedIncorrectAnswers.includes(randomIncorrect)) {
                        selectedIncorrectAnswers.push(randomIncorrect);
                    }
                }

                // Combine correct and incorrect answers, then shuffle
                const answersArray = [
                    { answer: correctAnswer, isCorrect: true },
                    ...selectedIncorrectAnswers.map(answer => ({ answer, isCorrect: false }))
                ];
                setShuffledAnswers(shuffleArray(answersArray));
            }
        };

        fetchContacts();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleOptionPress = (selectedAnswer) => {
        const isAnswerCorrect = selectedAnswer === answer;
        // Handle answer selection logic
    };

    return (
        <View style={styles.answerArea}>
            {shuffledAnswers.map((item, index) => (
                <Pressable
                    key={index}
                    style={[styles.answers, { backgroundColor: getBackgroundColor(item.answer) }]}
                    onPress={() => handleOptionPress(item.answer)}
                >
                    <Text style={styles.answerText}>{item.answer}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover', // Ensures the background image covers the entire screen
    },
  
    Backbutton: {
      maxWidth: 200, // Set a fixed width or use maxWidth
      padding: 10,
      //backgroundColor: '#f7e7b4',
      //borderRadius: 5,
      //marginVertical: 10, 
      alignItems: 'center',
      position: 'absolute',
      zIndex: 1,
      top: 5,
      left: 5,
    },
    //modal background
    retryModalWrapper:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  
    retryBox:{
      height: '25%',
      width:'80%',
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#A7C7E7',
      borderRadius: 15,
      borderWidth: 1,
      
    },
    retryOptionsArea:{
      flexDirection: 'column',
      position:'absolute',
      bottom: 0,
      gap: 5,
      width: "100%",
      justifyContent: 'space-between',
      padding: 25,
      alignItems: 'center',
      paddingTop: 10
  
  
    },
    retryOptions:{
      borderRadius: 7,
      alignItems: 'center',
      alignContent:'center',
      paddingVertical: 3,
      width: '90%',
      backgroundColor: '#f7e7b4',
      borderWidth: 1,
      
    },
  
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: 'rgba(128, 128, 128, 0.4)',
    },
    modalView: {
      width: '70%',
      justifyContent: 'center',
      // position: 'absolute',
      // bottom: 165,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    
    finishDetails:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width:'100%',
      paddingHorizontal: 10,
      position: 'absolute',
      top: 60,
    },
  
  
    
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
      //height: '33%',
      flexDirection: 'row',
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
      //backgroundColor: '#A7C7E7',
      
    },
  
    hearts: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'right',
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
      marginTop: 15,
    },
  
    score: {
      width: '100%',
      flexDirection: 'row',
      //justifyContent: 'flex-end',
      justifyContent: 'space-between',
      //justifyContent: 'space-around',
      paddingHorizontal: 10,
  
    },
  
    scoreText:{
      fontSize: 25,
      fontFamily: 'EBGaramond_800ExtraBold',
      color: 'white',
      textShadowColor: 'black', // Outline color
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 1, // Blur radius for the shadow
    },
    QuestionOrder:{
      fontSize: 25,
      fontFamily: 'EBGaramond_800ExtraBold',
      color: 'white',
      textShadowColor: 'black', // Outline color
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 1, // Blur radius for the shadow
      position: 'absolute',
      top: 10,
      left: '41.5%',
    },
  
    questionArea:{
      backgroundColor: 'rgba(211, 211, 211, 0.3)',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: 250,
      borderWidth: 1,
      borderRadius: 15,
      marginHorizontal: 10,
    },
  
    answerArea: {
      width: '100%',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 5,
      gap: 5,
      marginTop: 10,
      justifyContent: 'space-between',
      fontFamily: 'EBGaramond_800ExtraBold',
    
    },
  
    answers: {
      //backgroundColor: '#f5e8c7',
      backgroundColor: 'rgba(211, 211, 211, 0.1)',
      flexDirection: 'column',
      borderColor: 'black',
      borderWidth: 1,
      alignContent: 'center',
      borderRadius: 15,
      height: 100,
      //width: 400,
      minWidth: '100%',
      justifyContent: 'center',
      fontFamily: 'EBGaramond_800ExtraBold',
     
     
    },
    pressedAnswer: {
      backgroundColor: 'rgba(211, 211, 211, 0.7)',
  
    },
  
    button: {
      width: 200, // Set a fixed width or use maxWidth
      padding: 10,
      backgroundColor: '#f7e7b4',
      borderRadius: 5,
      marginVertical: 10, 
      alignItems: 'center'
    },
    
    ModalButton: {
      width: 200, // Set a fixed width or use maxWidth
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      marginVertical: 10, 
      alignItems: 'center'
    },
  
    text: {
      color: '#000000',
      fontSize: 12,
      fontFamily: 'EBGaramond_800ExtraBold'
  },
  
  questionText:
  {
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
  },
  
  answerText: {
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
    
    //width: '90%',
    //height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  
  nextButtonArea: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  
  
  },
  
  nextButton: {
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    alignItems: 'center',
    minWidth: '75%',
  
  
  },
  pressedNextButton: {
    backgroundColor: '#d9ca9c',
  
  },
  emptyHeartsPlaceholder: {
    width: "100%", 
    height: 32, 
  },
  
  
  });