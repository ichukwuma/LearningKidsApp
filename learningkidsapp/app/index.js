import React from 'react';
import { Pressable, Text, View, StyleSheet,Image,Dimensions} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';
const { width, height } = Dimensions.get('window');

//Landing Screen is the Main Entry of the Application, index.js = landing screen
export default function Button(clickButton) {

  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }

  const { onPressLanding2} = clickButton;
  return (
   <View style={styles.container}>
      <Image
        source={require('../assets/landing_screen.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <Link href="/signup_login/landing_screen_2" asChild>
        <Pressable style={styles.button_invisible} onPressLoginBtn={onPressLanding2}>
          <Text style={styles.text}></Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',       
  //backgroundColor: '#A7C7E7',
 
},
image: {
  width: width, 
  height: height, 
},
button: {
  width: 200,
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center'
},
button_invisible: {
  position: 'absolute',  
  top: 590,              
  left: 65,              
  width: 250,
  height: 80,           
  backgroundColor: 'transparent', 
},
teamLogo: {
  alignContent: 'center',
  width: 250,
  height: 250,
},
corgiInHatContainer: {
  marginBottom: 0,
  alignContent: 'center'
},
dogHatImage: {
  width: 125,
  height: 125,
},
});