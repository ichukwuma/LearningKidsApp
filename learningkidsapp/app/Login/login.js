import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';



export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleParentLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required!');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Login successful', `Welcome back!`);
          setEmail('');
          setPassword('');
          router.push('/home/home');
        })
        .catch((error) => {
          Alert.alert('Login failed', 'Incorrect Email or Password');
        });
    }
  };
 

  

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/dogwithhat.png')} style={styles.dogHatImage}/>

      <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
          <TextInput 
            style={styles.input}
            placeholder='EMAIL'
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail} 
            autoCorrect={false}
            autoCapitalize='none'
          />
          </View>

          <Pressable>
            <Text style= {styles.HyperLinkText}>Forgot Email</Text>
          </Pressable>

        <View style={styles.inputView}>
          <TextInput 
            secureTextEntry={true} 
            style={styles.input}
            placeholder='PASSWORD' 
            placeholderTextColor={'grey'} 
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>

          <Pressable>
            <Text style= {styles.HyperLinkText}>Forgot Password</Text>
          </Pressable>

          <View style={{padding: 7, justifyContent: 'center'}}>
            <Pressable style={styles.button} onPress={handleParentLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text>Don't Have an Account? </Text> 
              <Link href="/signup/Screen1" asChild>
                <Pressable><Text style = {styles.HyperLinkText}>Register Here</Text></Pressable>
              </Link>
          </View>
    <View>
      
     <Link href="/" asChild>
        <Pressable style={styles.button}>
            <Text style={styles.text}>Index.js</Text>
        </Pressable>
      </Link>

    </View>

    </SafeAreaView>
   

  );

}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16, // Padding around the container
  backgroundColor: '#A7C7E7',
  
},

inputText:{
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
},

dogHatImage: {
  width: 125,
  height: 100,
  alignItems: 'center'
},

title : {
  fontSize : 30,
  fontWeight : "bold",
  textTransform : "uppercase",
  textAlign: "center",
  paddingVertical : 0,
  paddingBottom: 10,
 
},

inputView : {
  gap : 15,
  width : "100%",
  paddingHorizontal : 40,
  paddingTop: 5,
  paddingBottom: 5,
 
  
  alignItems: 'center',
},

//input bubble
input : {
  width: 177,
  height : 40,
  paddingHorizontal : 8,
  borderWidth : 1,
  borderRadius: 11,
  backgroundColor: '#f7e7b4',
  alignItems: 'center',
  alignContent: 'center',
  
  
},

/*buttonView :{
  width :"100%",
  paddingHorizontal : 50,
  alignItems: 'center',
  paddingTop: 7,
  
},
*/
  /*button : {
  height : 45,
  width: 150,
  borderColor : "black",
  borderWidth  : 1,
  borderRadius : 25,
  paddingHorizontal : 20,
  paddingVertical: 20,
  alignItems : "center",
  justifyContent : "center",
  alignContent: 'center',

  
 
},

*/
button: {
  width: 200, // Set a fixed width or use maxWidth
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  alignItems: 'center',
  borderWidth: 1,
  alignSelf: 'center',
},




  buttonText : {
    justifyContent: 'center',
    fontSize : 21,
    textAlign: "center",
    fontWeight: 'bold',
  },

  HyperLinkText: {
    color: '#0000EE',
    textDecorationLine: 'underline',
    //paddingVertical: 5,
    alignSelf: 'center',
  },

  
});