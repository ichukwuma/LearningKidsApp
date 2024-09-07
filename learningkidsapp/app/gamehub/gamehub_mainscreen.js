import React from 'react';
import { Pressable, Text, View, StyleSheet, Image} from 'react-native';
import {  useFonts, EBGaramond_600SemiBold,EBGaramond_800ExtraBold} from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';



export default function Button(clickButton) {

    {/*loading fonts here */}
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,EBGaramond_800ExtraBold
    });
    if (!fontsLoaded) {
        return null;
      }

    const { onPressCorgiEscapeTutorial, corgiEscapeTutorialBtn = 'Tutorial' } = clickButton;
    const { onPressCorgiEscapeStart, corgiEscapeStartBtn = 'Start' } = clickButton;
    const { onPressTreatFallsTutorial, treatFallsTutorialBtn = 'Tutorial' } = clickButton;
    const { onPressTreatFallsStart, treatFallsStartBtn = 'Start' } = clickButton;
  return (
    
    <View style={styles.container}>


        <View  style={styles.coinAndGameHubTextContainer}>
            {/* game hub header text */}
            <Text style={styles.GameHubText}>Game Hub</Text>

            {/* coin and coin name */}
                <View style={styles.coinContainer}>
                    <Image source={require('../../assets/games/45-32-Coin.png')} style={styles.coinImage} />
                    <Text style={styles.coinTitle}>$Coins</Text>
                </View>
        </View>

        <View style={styles.corgiEscapeContainer}>
            <Image source={require('../../assets/scale5doggo.png')} style={styles.doggoImage} />
            <Text style={styles.CorgiEscapeText} >Corgi Escape</Text>
            <Link href="/gamehub/corgi_escape_tutorial" asChild>
                <Pressable style={styles.button} onPressCorgiEscapeTutorial={onPressCorgiEscapeTutorial}>
                    <Text style={styles.text}>{corgiEscapeTutorialBtn}</Text>
                </Pressable>
            </Link>
            <Link href="/gamehub/corgi_escape" asChild>
                <Pressable style={styles.button} onPressCorgiEscapeStart={onPressCorgiEscapeStart}>
                    <Text style={styles.text}>{corgiEscapeStartBtn}</Text>
                </Pressable>
            </Link>
        </View>
        

        <View style={styles.treatFallsContainer}>
            <Image source={require('../../assets/games/Dog_biscuit.png')} style={styles.treatFallsImage} />
            <Text style={styles.TreatFallsText}>Treat Falls</Text>
            <Link href="/gamehub/treat_falls_tutorial" asChild>
                <Pressable style={styles.button} onPressTreatFallsTutorial={onPressTreatFallsTutorial}>
                    <Text style={styles.text}>{treatFallsTutorialBtn}</Text>
                </Pressable>
            </Link>

            <Link href="/gamehub/treat_falls" asChild>
                <Pressable style={styles.button} onPressTreatFallsStart={onPressTreatFallsStart}>
                    <Text style={styles.text}>{treatFallsStartBtn}</Text>
                </Pressable>
            </Link>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#A7C7E7',
    },
    corgiEscapeContainer: {
        marginBottom: 20,
        alignItems: 'center'
    },
    treatFallsContainer:{
        marginBottom: 20,
        alignItems: 'center'
    },
    button: {
        width: 200, // Set a fixed width or use maxWidth
        padding: 10,
        backgroundColor: '#FAC898',
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
        width: 75, 
        height: 75, 
        
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
        textAlign: 'center',
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