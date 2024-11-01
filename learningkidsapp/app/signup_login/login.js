import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { getDatabase, ref, get, update } from 'firebase/database';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleParentLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required!');
            return;
        }
    
        try {
            console.log("Attempting to sign in with email:", email);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed in:", user.uid);
    
            Alert.alert('Login successful', `Welcome back!`);
    
            const db = getDatabase();
            const parentId = user.uid;
            const childrenRef = ref(db, `parents/${parentId}/children`);
    
            const snapshot = await get(childrenRef);
            if (snapshot.exists()) {
                console.log("Snapshot data exists for children:", snapshot.val());
                const childrenData = snapshot.val();
                const childUsernames = Object.keys(childrenData).map(key => childrenData[key].username);
                const firstChildUsername = childUsernames[0];
                const childData = Object.values(childrenData).find(child => child.username === firstChildUsername);
    
                let newLevel = childData.level || 1;
                let newXP = childData.xp || 0;
                let totalXP = childData.totalXP || 0;
                const lastLoginTime = new Date(childData.lastLogin || 0);
                const now = new Date();
                const secondsDiff = Math.floor((now - lastLoginTime) / 1000);
    
                if (secondsDiff >= 5) {
                    newXP += 2;
                    console.log('XP Increased. New XP:', newXP);
                }
    
                while (newXP >= 1000) {
                    newXP -= 1000; 
                    newLevel++; 
                    totalXP += 700; 
                    console.log(`Level up! New Level: ${newLevel}, XP reset to: ${newXP}, Total XP: ${totalXP}`);
                }
    
                const childKey = Object.keys(childrenData).find(key => childrenData[key].username === firstChildUsername);
                const childRef = ref(db, `parents/${parentId}/children/${childKey}`);
                
                // Set a fallback image if selectedHatImage is undefined
                const defaultHatImage = require('../../assets/profiles/farmer_dog.png');
                const updatedHatImage = newLevel >= 2 ? require('../../assets/profiles/avocado_level2_dog.png') : (childData.selectedHatImage || defaultHatImage);
    
                await update(childRef, {
                    xp: newXP,
                    totalXP: totalXP,
                    lastLogin: now.toISOString(),
                    level: newLevel,
                    selectedHatImage: updatedHatImage,
                });
    
                router.push({
                    pathname: '/home/home',
                    params: { child_username: firstChildUsername }
                });
            } else {
                console.log("No children found for this parent in the database.");
                Alert.alert('No child accounts found for this parent.');
            }
    
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Login failed:", error.message);
            Alert.alert('Login failed', error.message);
        }
    };
    

    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold, EBGaramond_800ExtraBold
    });
    if (!fontsLoaded) {
        return null;
    }

    const backButton = () => {
        router.push('/signup_login/landing_screen_2'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />
            <Pressable style={styles.back_arrow_img} onPress={backButton}>
                <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
            </Pressable>

            <Image source={require('../../assets/dogwithhat.png')} style={styles.dogHatImage} />
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputView}>
                <TextInput 
                    style={styles.input} 
                    placeholder='PARENT EMAIL' 
                    onChangeText={setEmail} 
                    autoCorrect={false} 
                    autoCapitalize='none' 
                />
            </View>

            <Pressable>
                <Text style={styles.HyperLinkText}>Forgot Username</Text>
            </Pressable>

            <View style={styles.space} />

            <View style={styles.inputView}>
                <TextInput 
                    secureTextEntry={true} 
                    style={styles.input} 
                    placeholder='PASSWORD' 
                    onChangeText={setPassword} 
                    autoCorrect={false} 
                    autoCapitalize='none' 
                />
            </View>

            <Pressable>
                <Text style={styles.HyperLinkText}>Forgot Password</Text>
            </Pressable>

            <View style={styles.space} />

            <View style={{ padding: 7 }}>
                <Pressable style={styles.button} onPress={handleParentLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
            </View>

            <View style={styles.space} />

            <View style={{ flexDirection: 'column' }}>
                <Link href="/signup_login/landing_screen_2" asChild>
                    <Pressable>
                        <Text style={styles.HyperLinkText}>No Account? Sign Up Here.</Text>
                    </Pressable>
                </Link>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A7C7E7',
        ...StyleSheet.absoluteFillObject
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '200%',
    },
    dogHatImage: {
        width: 135,
        height: 135,
        alignItems: 'center'
    },
    back_arrow_img: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 75,
        height: 75,
    },
    title: {
        fontSize: 30,
        fontFamily: 'EBGaramond_800ExtraBold',
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 0,
        paddingBottom: 10,
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        paddingTop: 5,
        paddingBottom: 0,
        marginBottom: 5,
        alignItems: 'center',
    },
    input: {
        width: 175,
        height: 40,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
    },
    button: {
        width: 150,
        padding: 10,
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 21,
        textAlign: "center",
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    HyperLinkText: {
        color: '#0000EE',
        textDecorationLine: 'underline',
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    space: {
        height: 25,
    }
});





