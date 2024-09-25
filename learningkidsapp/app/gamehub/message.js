
import { Alert, Button, Image, ImageBackground, Modal, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

export default function Page() {

  const [emergencyContact, setEmergencyContact] = useState(''); // State for the emergency contact info

  useEffect(() => {
    // Function to fetch emergency contact info from Firestore
    const fetchEmergencyContact = async () => {
      try {
        // Replace these with actual parent and child names
        const parentName = "Parent1";
        const childName = "Child1";

        // Reference the emergency contact info for a specific child under a parent
        const docRef = doc(db, `ParentsCollection/${parentName}/ChildrenCollection/${childName}/EmergencyContactsCollection/Contact1`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Assuming the document contains fields like 'name', 'relationship', 'address', 'phone'
          const contactData = docSnap.data();
          const contactInfo = `
            Name: ${contactData.name}
            Relationship: ${contactData.relationship}
            Address: ${contactData.address}
            Phone: ${contactData.phone}
          `;
          setEmergencyContact(contactInfo); // Set the fetched data
        } else {
          console.log("No emergency contact info found");
        }
      } catch (error) {
        console.error('Error fetching emergency contact: ', error);
      }
    };

    fetchEmergencyContact(); // Fetch data when the component mounts
  }, []);

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