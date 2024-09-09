import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function LoginForm() {
  const [click, setClick] = useState(false);
  const {username, setUsername}= useState("");
  const {password, setPassword}= useState("");

  return (
    <SafeAreaView style={styles.container}>


      <Image source={require('../../assets/dogwithhat.png')} style={styles.dogHatImage}/>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput  style={styles.input} placeholder='USERNAME' onChangeText={setUsername} 
          autoCorrect={false} autoCapitalize='none'/>
        </View>

        <Pressable>
          <Text style= {styles.HyperLinkText}>Forgot Username</Text>
        </Pressable>

        <View style={styles.inputView}>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='PASSWORD' onChangetext={setPassword}
          autoCorrect={false} autoCapitalize='none'/>
          </View>
      <Pressable>
        <Text style= {styles.HyperLinkText}>Forgot Password</Text>
      </Pressable>



      <View style={{padding: 7}}>
        <Pressable style={styles.button} onPress={()=>Alert.alert("Login Successful")}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
     <View style={{flexDirection: 'row'}}>
      <Text>Didn't Sign Up? </Text> 
        <Link href="/gamehub/signup" asChild>
          <Pressable><Text style = {styles.HyperLinkText}>Register Here</Text></Pressable>
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
  paddingBottom: 0,
 
  marginBottom  :5,
  alignItems: 'center',
},

//input bubble
input : {
  width: 177,
  height : 40,
  paddingHorizontal : 8,
  borderWidth : 1,
  borderRadius: 20,
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
button : {
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

  buttonText : {
    fontSize : 21,
    textAlign: "center",
    fontWeight: 'bold',
  },

  HyperLinkText: {
    color: '#0000EE',
    textDecorationLine: 'underline',
    //paddingVertical: 5,
  },

  signUpText: {



  }

});