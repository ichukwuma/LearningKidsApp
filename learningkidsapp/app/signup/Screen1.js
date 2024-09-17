import React from 'react';
import { Pressable, Text, View, StyleSheet, Linking} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function ParentSignup() {

  const [email, setEmail] = useState(''); /*Inputs for the emails, usernames and pw*/
  const [parentfirstname, setParentFirstName] = useState('');
  const [parentlastname, setParentLastName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleParentSignup = () => { /*Pressing sign up button*/
    if (!email || !parentfirstname || !password || !parentlastname) {
      Alert.alert('Error', 'All fields are required!');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created successfully
        const user = userCredential.user;
        Alert.alert('Successful sign up', `Welcome ${parentfirstname}!`);
        ;
        
        // Reset form fields
        setEmail('');
        setParentFirstName('');
        setParentLastName('');
        setPassword('');
        // Navigate to Screen2
        router.push('/signup/Screen2');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }
};

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable>
            <Text>Back To Index</Text>
        </Pressable>
      </Link>
      <Text style={styles.title}>Parent Sign Up</Text>
      
      <Image
        source={require('../../assets/LearningKidsLogo.png')} 
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Parent First Name"
        value={parentfirstname}
        onChangeText={setParentFirstName}
        keyboardType="ParentFirstName"
      />

      <TextInput
        style={styles.input}
        placeholder="Parent Last Name"
        value={parentlastname}
        onChangeText={setParentLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />


      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

<TouchableOpacity style={styles.button} onPress={handleParentSignup}>
        <Text style={styles.buttonText}>Finish Parent Sign Up</Text>
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

TextInput: {
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