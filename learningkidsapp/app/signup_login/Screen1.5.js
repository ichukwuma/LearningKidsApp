import React from 'react';
import { Pressable, Text, View, StyleSheet,Image,Dimensions} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';




export default function Button(clickButton) {

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
    navigation.navigate('signup_login/Screen1'); 
    };

    const { onPressScreen2, Screen2Btn = 'Continue' } = clickButton;

  return (
   <View style={styles.container}>
    <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>

    <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
    </Pressable>

    <Text style={styles.title}>Now it's time to add your childs account.</Text>

        <View style={styles.corgiInHatContainer}>
          <Image source={require('../../assets/DogHouse.png')}style={styles.dogHouseImg} />
        </View>

    {/*space container for layout*/}
    <View style={styles.space}>
          
    </View>

    <Link href="/signup_login/Screen2" asChild>
        <Pressable style={styles.button} onPressScreen2={onPressScreen2}>
            <Text style={styles.text}>{Screen2Btn}</Text>
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
  ...StyleSheet.absoluteFillObject  
},
background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
button: {
  width: 200,
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  marginVertical: 10, 
  alignItems: 'center'
},
corgiInHatContainer: {
  marginBottom: 0,
  alignContent: 'center'
},
dogHouseImg: {
  width: 175,
  height: 175,
},
back_arrow_img: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 75,
    height: 75,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  space:{
    height: 50,
  }
});