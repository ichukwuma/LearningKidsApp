import React from 'react';
import { Pressable, Text, View, StyleSheet, Image, TextInput} from 'react-native';
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
    //const { onPressSettingEmail, SettingEmailBtn = 'Update Email' } = clickButton;
    //const { onPressSettingPassword, SettingPasswordBtn = 'Update Password' } = clickButton;
    //const { onPressSettingMainParent, SettingMainParentBtn = 'Assign Main Parent' } = clickButton;
    //const { onPressSettingEmergencyContacts, SettingEmergencyContactsBtn = 'Manage Emergency Contacts' } = clickButton;
    //const { onPressSettingContactUs, SettingContactUsBtn = 'Contact Us' } = clickButton;
    const { onPressSettingSave, SettingSaveBtn = 'Save' } = clickButton;
    const { onPressSettingLogOut, SettingLogoutBtn = 'Logout' } = clickButton;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />
            {/* Setting header text */}
            <Text style={styles.GameHubText}>Settings</Text>

            
            <Text style={styles.SettingText}>Update Email</Text>
            <TextInput style={styles.input} placeholder="Edit Email" />
            <Text style={styles.SettingText}>Update Password</Text>
            <TextInput style={styles.input} placeholder="Edit Password" />
            <Text style={styles.SettingText}>Assign Main Parent</Text>
            <TextInput style={styles.input} placeholder="Edit Main Parent" />


            {/* Save button */}
            <Link href="/home/home" asChild>
                <Pressable style={styles.button} onPress={onPressSettingSave}>
                    <Text style={styles.text}>{SettingSaveBtn}</Text>
                </Pressable>
            </Link>

            {/* Logout Button */}
            <Link href="/home/index" asChild>
                <Pressable style={styles.button} onPress={onPressSettingLogOut}>
                    <Text style={styles.text}>{SettingLogoutBtn}</Text>
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
        ...StyleSheet.absoluteFillObject, // Fill the entire container with this gradient color
        width: '100%',
        height: '100%',
    },
    button: {
        width: 175, // Set a fixed width or use maxWidth
        padding: 10,
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10, 
        alignItems: 'center'
    },
    GameHubText: {
        fontSize: 40,
        fontFamily: 'EBGaramond_800ExtraBold'
        
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
    SettingText: {
        fontSize: 30,
        fontFamily: 'EBGaramond_600SemiBold',
        textAlign: 'left'
    },
    
  });
