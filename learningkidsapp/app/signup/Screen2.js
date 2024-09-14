import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { getDatabase, ref, push, set } from 'firebase/database';
import { auth, database } from '../config/firebaseConfig';

  export default function ChildSignup() {
    const [childfirstname, setChildFirstName] = useState('');
    const [childlastname, setChildLastName] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();
  
   
  
    const handleChildSignup = async () => {
      if (!childfirstname || !childlastname || !username) {
        Alert.alert('Error', 'All fields are required!');
        return;
      }
  
      const parentId = auth.currentUser?.uid; // Get parent’s unique ID
  
      if (!parentId) {
        Alert.alert('Error', 'Parent not authenticated.');
        return;
      }
  
      try {
        // Reference to the parent's children node in Realtime Database
        const childrenRef = ref(database, `parents/${parentId}/children`);
        
        // Create a new child entry under this parent
        const newChildRef = push(childrenRef);
  
        // Save child's data under the new reference
        await set(newChildRef, {
          firstName: childfirstname,
          lastName: childlastname,
          username: username,
        });
  
        Alert.alert('Successful child sign up', `Child ${childfirstname} registered successfully!`);
        
        // Reset form fields
        setChildFirstName('');
        setChildLastName('');
        setUsername('');
        
        // Navigate to next screen
        router.push('/signup/EmergencyContact');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Sign Up</Text>
      
      <Image
        source={require('../../assets/LearningKidsLogo.png')} 
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Child First Name"
        value={childfirstname}
        onChangeText={setChildFirstName}
        keyboardType="childFirstName"
      />

      <TextInput
        style={styles.input}
        placeholder="Child Last Name"
        value={childlastname}
        onChangeText={setChildLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

<TouchableOpacity style={styles.button} onPress={handleChildSignup}>
        <Text style={styles.buttonText}>Finish Child Sign Up</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#A7C7E7',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },

  image: {
    width: 200,  
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  
  input: {
    height: 50,
    borderColor: '#f7e7b4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontWeight: 'bold',
    fontFamily: 'EBGaramond_800ExtraBold',

  },

  button: {
    width: 200, 
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'EBGaramond_800ExtraBold',
  },
});