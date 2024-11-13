import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { updateEmail, updatePassword } from 'firebase/auth';

export default function Settings() {
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,
        EBGaramond_800ExtraBold
    });

    const route = useRoute();
    const { child_username } = route.params;
    const navigation = useNavigation();
    
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const backButton = () => {
        navigation.navigate('home/home', { child_username });
    };

    const handleUpdateEmail = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updateEmail(user, newEmail);
                Alert.alert('Success', 'A verification email has been sent to your address. Please verify it to complete your new email change.');
                setNewEmail('');
                
               
                await user.sendEmailVerification();
            } catch (error) {
                //Alert.alert('Error', error.message);
            }
        }
    };

    const handleUpdatePassword = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updatePassword(user, newPassword);
                Alert.alert('Success', 'Password updated successfully!');
                setNewPassword('');
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />

            <Pressable style={styles.back_arrow_img} onPress={backButton}>
                <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
            </Pressable>

            <Text style={styles.title}>Settings</Text>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="New Email"
                    value={newEmail}
                    onChangeText={setNewEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleUpdateEmail}>
                    <Text style={styles.buttonText}>Save Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
                    <Text style={styles.buttonText}>Save Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A7C7E7',
        ...StyleSheet.absoluteFillObject,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    back_arrow_img: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    input: {
        width: 200,
        height: 40,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
    },
    button: {
        width: 200,
        padding: 10,
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        alignItems: 'center',
    },
});


