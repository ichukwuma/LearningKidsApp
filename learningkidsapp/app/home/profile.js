import React from 'react';
import { Pressable, Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function Button(clickButton) {

    // Loading fonts here
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold, EBGaramond_800ExtraBold
    });
    if (!fontsLoaded) {
        return null;
    }

    // Buttons for screens
    const { onPressHome, homeScreenBtn = 'Home' } = clickButton;
    const { onPressProfileSave, profileScreenSaveBtn = 'Save' } = clickButton;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />

            <Text style={styles.profileHeadingText}>Username</Text>

            {/* User Profile Picture */}
            <View style={styles.userProfilePictureContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/hats/banana.png')} style={styles.hatImage} />
                    <Image source={require('../../assets/scale5doggo.png')} style={styles.doggoImage} />
                </View>
                <View style={styles.expAndexpText}>
                    <Text style={styles.xpLevelText}>Level: </Text>
                    <Image source={require('../../assets/games/exp.png')} style={styles.expImage} />
                    <Text style={styles.xpLevelText}># until new reward and level.</Text>
                </View>
            </View>

            <TextInput style={styles.input} placeholder="Edit Username" />
            <TextInput style={styles.input} placeholder="Edit Name" />
            <TextInput style={styles.input} placeholder="Edit Address" />

            {/* Linking back to home screen */}
            <Link href="/home/home" asChild>
                <Pressable style={styles.button} onPress={onPressHome}>
                    <Text style={styles.text}>{homeScreenBtn}</Text>
                </Pressable>
            </Link>

            {/* Save button */}
            <Link href="/home/home" asChild>
                <Pressable style={styles.button} onPress={onPressProfileSave}>
                    <Text style={styles.text}>{profileScreenSaveBtn}</Text>
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
    },
    text: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'EBGaramond_800ExtraBold'
    },
    background: {
        ...StyleSheet.absoluteFillObject, // Fill the entire container with this gradient color
    },
    profileHeadingText: {
        fontSize: 30,
        fontFamily: 'EBGaramond_600SemiBold'
    },
    userProfilePictureContainer: {
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        position: 'relative', // Enable positioning inside this container
        alignItems: 'center',
    },
    doggoImage: {
        width: 200,
        height: 200,
    },
    hatImage: {
        width: 200,
        height: 100,
        position: 'absolute', 
        top: 0, 
    },
    expImage: {
        width: 330,
        height: 100,
    },
    xpLevelText: {
        fontSize: 16,
        textAlign: 'center'
    },
    expAndexpText: {
        flexDirection: 'column', 
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#f7e7b4',
        borderWidth: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        marginTop: 10,
    },
    button: {
        width: 200,
        padding: 5,
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
});
