import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ParentSignup() {

  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }
  //const [email, setEmail] = useState(''); /*Inputs for the emails, usernames and pw*/
  //const [parentfirstname, setParentFirstName] = useState('');
  //const [parentlastname, setParentLastName] = useState('');
  //const [password, setPassword] = useState('');
  //const router = useRouter(); // Initialize useRouter

  {/*1st landing screen button */}
  const navigation = useNavigation();
    const backButton = () => {
      navigation.navigate('signup_login/landing_screen_2'); 
    };

  const handleParentSignup = () => { /*Pressing sign up button*/
    if (!email || !parentfirstname || !password || !parentlastname) {
      Alert.alert('Error', 'All fields are required!');
    } else {
      // Here you would typically send the data to your backend
      Alert.alert('Successful sign up');
      // Reset form field
      setEmail('');
      setParentFirstName('');
      setParentLastName('');
      setPassword('');
    // Navigate to Screen2
    router.push('/signup/Screen2');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>
      {/*back button*/}
      <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
      </Pressable>

      <View style={styles.space}>
          
      </View>

      <Text style={styles.title}>Parent Sign Up</Text>
      
      <Image
        source={require('../../assets/scale5doggo.png')} 
        style={styles.image}
      />

      <View style={styles.inputView} asChild>
      <TextInput
        style={styles.input}
        placeholder="Parent First Name"
        //value={parentfirstname}
        //onChangeText={setParentFirstName}
        keyboardType="ParentFirstName"
      />

      <TextInput
        style={styles.input}
        placeholder="Parent Last Name"
        //value={parentlastname}
        //onChangeText={setParentLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        //value={email}
        //onChangeText={setEmail}
        keyboardType="email-address"
      />


      <TextInput
        style={styles.input}
        placeholder="Password"
        //value={password}
        //onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleParentSignup}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',       
    backgroundColor: '#A7C7E7',
  },
  space:{
    height: 50,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  back_arrow_img: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 75,
    height: 75,
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
    width: 200,
    height : 40,
    paddingHorizontal : 8,
    borderWidth : 2,
    borderRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    width: 150,
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    paddingTop: 5,
    paddingBottom: 0,
    marginBottom  :5,
    alignItems: 'center',
  },
});