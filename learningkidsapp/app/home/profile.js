import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../config/firebaseConfig';

const images = [
    require('../../assets/profiles/cherry_dog.png'),
    require('../../assets/profiles/pizza_dog.png'),
    require('../../assets/profiles/icecream_dog.png'),
    require('../../assets/profiles/banana_dog.png'),
    require('../../assets/profiles/avocado_level2_dog.png')
];

export default function Profile() {
    let [fontsLoaded] = useFonts({
        EBGaramond_600SemiBold,
        EBGaramond_800ExtraBold,
    });

    const navigation = useNavigation();
    const route = useRoute();
    const { child_username } = route.params;
    const [totalXP, setTotalXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [selectedCorgi, setSelectedCorgi] = useState(null);

    const backButton = () => {
        navigation.navigate('home/home', { child_username });
    };

    useEffect(() => {
        const parentId = auth.currentUser?.uid;

        if (parentId) {
            const childRef = ref(getDatabase(), `parents/${parentId}/children`);
            get(childRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const childrenData = snapshot.val();
                    const childData = Object.values(childrenData).find(child => child.username === child_username);
                    if (childData) {
                        setLevel(childData.level);
                        setXp(childData.xp);
                        setTotalXp(childData.totalXP);
                       
                    }
                }
            }).catch((error) => {
                console.error("Error fetching Child data: ", error);
            });

            const corgiRef = ref(getDatabase(), `parents/${parentId}/corgis/${parentId}`);
            get(corgiRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const corgiData = snapshot.val();
                    if (corgiData && corgiData.selectedCorgi) {
                        const matchingImage = images.find(image => image === corgiData.selectedCorgi);
                        setSelectedCorgi(matchingImage);
                    }
                }
            }).catch((error) => {
                console.error("Error fetching Corgi data: ", error);
            });
        }
    }, []);

    if (!fontsLoaded) {
        return null; 
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />
            <Pressable style={styles.back_arrow_img} onPress={backButton}>
                <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
            </Pressable>

            <Text style={styles.profileHeadingText}>{child_username}'s Profile</Text>
            {selectedCorgi && (
                <View style={styles.userProfilePictureContainer}>
                    <Image source={selectedCorgi} style={styles.doggoImage} />
                </View>
            )}

            <Text style={styles.textBigger}>Level: {level}</Text>
            <Text style={styles.textBigger}>XP: {xp}/{totalXP} </Text>
            <Text style={styles.text}>{totalXP - xp} XP left</Text>
            <Text style={styles.text}>to unlock new hat reward and level up.</Text>
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
    text: {
        color: '#000000',
        fontSize: 15,
        fontFamily: 'EBGaramond_600SemiBold',
    },
    textBigger: {
        color: '#000000',
        fontSize: 25,
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    profileHeadingText: {
        fontSize: 30,
        fontFamily: 'EBGaramond_600SemiBold',
    },
    userProfilePictureContainer: {
        alignItems: 'center',
        padding: 20,
    },
    doggoImage: {
        width: 200,
        height: 200,
    },
    back_arrow_img: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 75,
        height: 75,
    },
});


