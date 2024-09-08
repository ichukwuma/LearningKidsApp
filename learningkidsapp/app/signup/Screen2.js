import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';


/*import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';*/

export default function ChildSignup() {

  /*loading fonts here
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
});
if (!fontsLoaded) {
    return null;
  }*/

  const [email, setEmail] = useState(''); /*Inputs for the emails, usernames and pw*/
  const [childfirstname, setchildFirstName] = useState('');
  const [childlastname, setchildLastName] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handlechildSignup = () => { /*Pressing sign up button*/
    if (!email || !childfirstname || !username || !childlastname) {
      Alert.alert('Error', 'All fields are required!');
    } else {
      // Here you would typically send the data to your backend
      Alert.alert('Successful sign up');
      // Reset form field
      setEmail('');
      setchildFirstName('');
      setchildLastName('');
      setUsername('');
// Navigate to Screen2
router.push('/signup/Screen2');
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
        onChangeText={setchildFirstName}
        keyboardType="childFirstName"
      />

      <TextInput
        style={styles.input}
        placeholder="Child Last Name"
        value={childlastname}
        onChangeText={setchildLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        secureTextEntry
      />

<TouchableOpacity style={styles.button} onPress={handlechildSignup}>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  image: {
    width: 200,  // Adjust the width and height as needed
    height: 200,
    marginBottom: 20, // Space between the image and input fields
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
  },

  button: {
    width: 200, // Set a fixed width or use maxWidth
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