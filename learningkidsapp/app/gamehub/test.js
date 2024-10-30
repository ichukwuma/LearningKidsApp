import { Alert, Button, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, Modal, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { getQuestions } from '../config/questions';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { database } from '../config/firebaseConfig'; // Your Firebase config
import { ref, onValue } from 'firebase/database';
import { auth } from '../config/firebaseConfig';

export default function Questionsbox() {
    const [contacts, setContacts] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [wrongAnswer, setWrongAnswer] = useState('');
  
    useEffect(() => {
      const fetchContacts = async () => {
        const parentId = auth.currentUser?.uid; // Get the current user's ID
        const childId = 'EmergencyContacts'; // Replace with actual child ID logic
  
        if (!parentId || !childId) {
          Alert.alert('Error', 'Parent or Child ID missing.');
          return;
        }
  
        const contactsRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts`);
        onValue(contactsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const loadedContacts = Object.keys(data).map(key => ({ ...data[key], key }));
            setContacts(loadedContacts);
  
            // Randomly select a contact
            if (loadedContacts.length > 0) {
              const randomIndex = Math.floor(Math.random() * loadedContacts.length);
              const randomContact = loadedContacts[randomIndex];
              setCurrentQuestion(`What is ${randomContact.name}'s phone number?`);
              setAnswer(randomContact.phone); // Set the answer based on the selected contact
            }
          } else {
            setContacts([]);
            setCurrentQuestion('');
            setAnswer('');
          }
        });
      };
  
      fetchContacts();
    }, []);
  
    const handleAnswerSelection = () => {
      Alert.alert(`The answer is: ${answer}`); // Show the phone number
    };


    const SelectAContact = () => {
      if (loadedContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * loadedContacts.length);
      const randomContact = loadedContacts[randomIndex];
      setCurrentQuestion(`What is ${randomContact.name}'s phone number?`);
      setAnswer(randomContact.phone); // Set the answer based on the selected contact
    }
   else {
    setContacts([]);
    setCurrentQuestion('');
    setAnswer('');
  }}



    return (
        <ImageBackground source={require('../../assets/CorgiEscapeBG.png')} style={styles.background}>
           <SafeAreaView style={styles.container}>
              <View style={styles.questionBox}>
                 <Text style={styles.questionText}>{currentQuestion}</Text>
              </View>
              <View style={styles.answerContainer}>
                 {/* First Answer Box with Correct Answer */}
                 <Pressable
                    style={styles.answerButton}
                    onPress={() => Alert.alert(`The answer is: ${answer}`)}
                 >
                    <Text style={styles.answerText}>{answer || 'Select an answer'}</Text>
                 </Pressable>
     
                 {/* Second Answer Box with Incorrect Answer */}
                 <Pressable 
                    style={styles.answerButton}
                    onPress={() => Alert.alert('Incorrect answer selected!')}
                 >
                    <Text style={styles.answerText}>Wrong Answer 1</Text>
                 </Pressable>
     
                 {/* Third Answer Box with Another Incorrect Answer */}
                 <Pressable 
                    style={styles.answerButton}
                    onPress={() => Alert.alert('Incorrect answer selected!')}
                 >
                    <Text style={styles.answerText}>Wrong Answer 2</Text>
                 </Pressable>
              </View>
           </SafeAreaView>
        </ImageBackground>
     );
     
     
     
     
}

const styles = StyleSheet.create({
    background: {
       flex: 1,
       resizeMode: 'cover',
    },
    container: {
       flex: 1,
       padding: 16,
       justifyContent: 'center',
    },
    questionBox: {
       marginBottom: 20,
       padding: 10,
       backgroundColor: 'rgba(255, 255, 255, 0.8)',
       borderRadius: 10,
    },
    questionText: {
       fontSize: 18,
       fontWeight: 'bold',
    },
    answerContainer: {
       marginTop: 10,
       alignItems: 'center',
    },
    answerButton: {
       padding: 10,
       backgroundColor: 'rgba(211, 211, 211, 0.6)',
       borderRadius: 5,
       marginVertical: 5,
       width: '80%', // Adjust width as desired
       alignItems: 'center',
    },
    answerText: {
       fontSize: 20,
    },
 });
 