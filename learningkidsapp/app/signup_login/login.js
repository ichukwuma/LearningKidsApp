import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';



export default function LoginForm() {
  const [click, setClick] = useState(false);
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


  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }

  {/*1st landing screen button */}
  const navigation = useNavigation();
    const backButton = () => {
      navigation.navigate('signup_login/landing_screen_2'); 
    };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>
      {/*back button*/}
      <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
      </Pressable>

      <Image source={require('../../assets/dogwithhat.png')} style={styles.dogHatImage}/>
      <Text style={styles.title}>Login</Text>

      {/*username input*/}
      <View style={styles.inputView}>
        <TextInput  style={styles.input} placeholder='USERNAME' onChangeText={setEmail} 
          autoCorrect={false} autoCapitalize='none'/>
      </View>

        <Pressable>
          <Text style= {styles.HyperLinkText}>Forgot Username</Text>
        </Pressable>

        {/*space container for layout*/}
        <View style={styles.space}>
          
        </View>

        {/*password input*/}
        <View style={styles.inputView}>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='PASSWORD' onChangetext={setPassword}
          autoCorrect={false} autoCapitalize='none'/>
        </View>
      <Pressable>
        <Text style= {styles.HyperLinkText}>Forgot Password</Text>
      </Pressable>

      <View style={styles.space}>
          
      </View>

      <View style={{padding: 7}}>
        <Pressable style={styles.button} onPress={()=>Alert.alert("Login Successful")}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>


      {/*space container for layout*/}
      <View style={styles.space}>
          
      </View>
     <View style={{flexDirection: 'column'}}>
        <Link href="/signup_login/signup" asChild>
          <Pressable><Text style = {styles.HyperLinkText}>No Account? Sign Up Here.</Text></Pressable>
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
  width: 135,
  height: 135,
  alignItems: 'center'
},

back_arrow_img: {
  position: 'absolute',
  top: 20,
  left: 20,
  width: 75,
  height: 75,
},

title : {
  fontSize : 30,
  fontFamily: 'EBGaramond_800ExtraBold',
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
  paddingBottom: 0,
  marginBottom  :5,
  alignItems: 'center',
},

input : {
  width: 175,
  height : 40,
  paddingHorizontal : 8,
  borderWidth : 2,
  borderRadius: 10,
  alignItems: 'center',
  alignContent: 'center',
},

background: {
  ...StyleSheet.absoluteFillObject,
  width: '100%',
  height: '100%',
},
button: {
  width: 150,
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center',
},

  buttonText : {
    fontSize : 21,
    textAlign: "center",
    fontFamily: 'EBGaramond_800ExtraBold',
  },

  HyperLinkText: {
    color: '#0000EE',
    textDecorationLine: 'underline',
    fontFamily: 'EBGaramond_800ExtraBold',
  },

 
  space:{
    height: 25,
  }

});