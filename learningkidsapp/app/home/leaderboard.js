import React from 'react';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
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
                    <Text style={styles.xpLevelText}>Points: 0 pts</Text>
                </View>
            </View>

            {/* Table */}
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Name</Text>
                    <Text style={styles.tableHeaderText}>Score</Text>
                
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Soul Crusher</Text>
                    <Text style={styles.tableCell}>105 pts</Text>
       
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Hopeless</Text>
                    <Text style={styles.tableCell}>100 pts</Text>
      
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Why Try</Text>
                    <Text style={styles.tableCell}>55 pts</Text>
             
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Despair</Text>
                    <Text style={styles.tableCell}>5 pts</Text>
               
                </View>
                {/* Add more rows as needed */}
            </View>

            {/* Linking back to home screen */}
            <Link href="/home/home" asChild>
                <Pressable style={styles.button} onPress={onPressHome}>
                    <Text style={styles.text}>{homeScreenBtn}</Text>
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
        fontFamily: 'EBGaramond_600SemiBold',
        textAlign: 'center'
    },
    expAndexpText: {
        flexDirection: 'column', 
        alignItems: 'center',
        marginBottom: 10,
    },
    tableContainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f7e7b4',
        padding: 10,
    },
    tableHeaderText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'EBGaramond_800ExtraBold'

    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'EBGaramond_600SemiBold',

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
