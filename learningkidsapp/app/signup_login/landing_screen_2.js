import React from 'react';
import { Pressable, Text, View, StyleSheet,Image} from 'react-native';
import { useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

//Landing Screen is the Main Entry of the Application, index.js = landing screen
export default function Button(clickButton) {

  {/*loading fonts here */}
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold,EBGaramond_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }
  //Sign up and login buttons defined here:
    const { onPressLoginBtn, LoginBtn = 'LOGIN'} = clickButton;
    const { onPressSignUpBtn, SignUpBtn = 'SIGN UP' } = clickButton;

  //button to go back to index.js aka the first landing screen
    const navigation = useNavigation();
    const backButton = () => {
      navigation.navigate('index'); 
    };
   
    return (
     <View style={styles.container}>
       <LinearGradient colors={['#6495ED', '#B0C4DE','#6495ED']} style={styles.background}/>

        {/*back button*/}
        <Pressable style={styles.back_arrow_img} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
        </Pressable>

      
        {/*corgi with banana hat image*/}
        <View style={styles.corgiInHatContainer}>
          <Image source={require('../../assets/dogwithhat.png')}style={styles.dogHatImage} />
        </View>
  
        <Text style={styles.text}>Have an account?</Text>
        {/*login button*/}
        <Link href="/signup_login/login" asChild>
          <Pressable style={styles.button} onPressLoginBtn={onPressLoginBtn}>
            <Text style={styles.text}>{LoginBtn}</Text>
          </Pressable>
        </Link>

        {/*space container for layout*/}
        <View style={styles.space}>
          
        </View>
  
        <Text style={styles.text}>Don't have an account?</Text>
        {/*sign up button*/}
        <Link href="/signup_login/Screen1" asChild>
          <Pressable style={styles.button} onPressSignUpBtn={onPressSignUpBtn}>
            <Text style={styles.text}>{SignUpBtn}</Text>
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
    backgroundColor: '#A7C7E7',
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
  Landing_Screen_Heading_Text:{
    fontSize: 40,
    fontFamily: 'EBGaramond_800ExtraBold',
  },
  corgiInHatContainer: {
    marginBottom: 0,
    alignContent: 'center'
  },
  dogHatImage: {
    width: 135,
    height: 135,
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
