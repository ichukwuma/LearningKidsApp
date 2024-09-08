import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'

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

        <View style={styles.inputView}>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='PASSWORD' onChangetext={setPassword}
          autoCorrect={false} autoCapitalize='none'/>
          </View>
      

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={()=>Alert.alert("Login Successful")}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      
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
  paddingVertical: 5,
  marginBottom  :5,
  alignItems: 'center',
},

input : {
  height : 50,
  paddingHorizontal : 20,
  borderWidth : 1,
  borderRadius: 7,
  alignItems: 'center',
  alignContent: 'center',
  
  
},

buttonView :{
  width :"100%",
  paddingHorizontal : 50,
  alignItems: 'center',
  paddingTop: 3,
},

button : {
  height : 45,
  width: 150,
  borderColor : "gray",
  borderWidth  : 1,
  borderRadius : 5,
  paddingHorizontal : 20,
  paddingVertical: 20,
  alignItems : "center",
  justifyContent : "center",
  alignContent: 'center',
  
 
},

  buttonText : {
    fontSize : 21,
    textAlign: "center",
  },



});