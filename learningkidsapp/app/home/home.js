import React from 'react';
import { Pressable, Text, View, StyleSheet, Image} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';


export default function Button(clickButton) {

    {/*loading fonts here */}
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,EBGaramond_800ExtraBold
    });
    if (!fontsLoaded) {
        return null;
      }


    {/*Buttons for screens*/}
    const { onPressIndex, indexScreenBtn = 'Index.Js' } = clickButton;
    const { onPressSettings, settingsScreenBtn = 'Settings' } = clickButton;
    const { onPressProfile, profileScreenBtn = 'Profile' } = clickButton;
    const { onPressLeaderboard, leaderboardScreenBtn = 'Leaderboard' } = clickButton;

  return (
    <View style={styles.container}>
        <LinearGradient colors={['#6495ED', '#B0C4DE','#E0FFFF','#6495ED']} style={styles.background}/>

        <View  style={styles.coinAndGameHubTextContainer}>
            {/* game hub header text */}
            <Text style={styles.GameHubText}>Home</Text>


            {/* coin and coin name */}
             
            <View style={styles.coinContainer}>
                    <Image source={require('../../assets/games/45-32-Coin.png')} style={styles.coinImage} />
                    <Text style={styles.coinTitle}>$Coins</Text>
                </View>

              
        </View>

      
             


    {/*Dog house image */}


    <Link href="/home/profile" asChild>
                <Pressable style={styles.corgiEscapeContainer}>
                    <Image source={require('../../assets/doggohouse.gif')} style={styles.dogHouseImage} />
                </Pressable>
            </Link>
  


            

            {/*Linking back to index.js page*/}
            <Link href="/" asChild>
                <Pressable style={styles.indexButton} onPressIndex={onPressIndex}>
                    <Text style={styles.text}>{indexScreenBtn}</Text>
                </Pressable>
            </Link>

            {/*Linking back to settings.js page*/}
            <Link href="/home/settings" asChild>
                <Pressable style={styles.indexButton} onPressSettings={onPressSettings}>
                    <Text style={styles.text}>{settingsScreenBtn}</Text>
                </Pressable>
            </Link>

            {/*Linking back to profile screen*/}
            {/* <Link href="/home/profile" asChild>
                <Pressable style={styles.button} onPressProfile={onPressProfile}>
                    <Text style={styles.text}>{profileScreenBtn}</Text>
                </Pressable>
  </Link>  */}

            {/*Linking back to leaderboard screen*/}
            <Link href="/home/leaderboard" asChild>
                <Pressable style={styles.button} onPressLeaderboard={onPressProfile}>
                    <Text style={styles.text}>{leaderboardScreenBtn}</Text>
                </Pressable>
            </Link>

    </View>

  );
}

//hi this is for styles

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',       
        backgroundColor: '#A7C7E7',
        flex:1,
    },
    background: {
        ...StyleSheet.absoluteFillObject, // Fill the entire container with this gradient color
        width: '100%',
        height: '100%',
    },
    corgiEscapeContainer: {
        alignItems: 'center',
    },
    dogHouseContainer: {
      alignItems: 'center',
  },
    treatFallsContainer:{
        alignItems: 'center'
    },
    indexButton:{
        backgroundColor: '#FAC898',
        width: 175, 
        padding: 10,
        borderRadius: 5,
        marginVertical: 10, 
        alignItems: 'center'
    },
    settingsButton:{
      backgroundColor: '#FAC898',
      width: 175, 
      padding: 10,
      borderRadius: 5,
      marginVertical: 10, 
      alignItems: 'center'
  },
    button: {
        width: 175, // Set a fixed width or use maxWidth
        padding: 10,
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10, 
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'EBGaramond_800ExtraBold'
    },
    GameHubText: {
        fontSize: 40,
        fontFamily: 'EBGaramond_800ExtraBold'
        
    },
    CorgiEscapeText:{
        fontSize: 25,
        fontFamily: 'EBGaramond_600SemiBold'
    },
    TreatFallsText:{
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'EBGaramond_600SemiBold',
    },
    coinImage: {
        width: 70, 
        height: 70, 
        
    },

    dogHouseImage: {
      width: 300, 
      height: 300,
  },

    doggoImage: {
        width: 125, 
        height: 125,
    },
    treatFallsImage:{
        width: 100, 
        height: 100,
    },

    coinTitle: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'right',
        marginTop: 0,
        fontFamily: 'EBGaramond_600SemiBold'
    },
    coinAndGameHubTextContainer: {
       flexDirection: 'row', 
       alignItems: 'center', 
    },
    coinContainer: {
        alignItems: 'center', // Center align the image and title within the container
      },
});