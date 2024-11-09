import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../config/firebaseConfig';

// Updated images array with levels
const images = [
    { source: require('../../assets/profiles/cherry_dog.png'), level: 1 },
    { source: require('../../assets/profiles/farmer_dog.png'), level: 1 },
    { source: require('../../assets/profiles/tophat_dog.png'), level: 1 },
    { source: require('../../assets/profiles/avocado_level2_dog.png'), level: 2 },
    { source: require('../../assets/profiles/banana_dog.png'), level: 3 },
    { source: require('../../assets/profiles/icecream_dog.png'), level: 4 },
    { source: require('../../assets/profiles/pizza_dog.png'), level: 5 },
    { source: require('../../assets/profiles/locked_hat.png'), level: 6 },

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
                        const matchingImage = images.find(image => image.source === corgiData.selectedCorgi);
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

    const renderItem = ({ item }) => (
        <View style={styles.hatItem}>
            <Image source={item.source} style={styles.hatImage} />
            <Text style={styles.hatText}>Level: {item.level}</Text>
        </View>
        
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.hatUnlockSection}>
                
                <Pressable style={styles.back_arrow_img} onPress={backButton}>
                    <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
                </Pressable>

                <View style={styles.usernameContainer}>
                    <Text style={styles.textBigger}>{child_username}'s Profile</Text>
                </View>

                {selectedCorgi && (
                    <View style={styles.userProfilePictureContainer}>
                        <Image source={selectedCorgi.source} style={styles.doggoImage} />
                    </View>
                )}

                <View style={styles.xp_text}>
                    <Text style={styles.textBigger}>Level: {level}</Text>
                    <Text style={styles.textBigger}>XP: {xp}/{totalXP}</Text>
                  
                  
                  
                    <Text style={[styles.center_bold_words, styles.extraTopMargin]}>Want to a new hat?</Text>
                    <Text style={[styles.center_bold_words]}>Scroll Down!
                    </Text>
                </View>

                

                <View style={styles.hat_unlock_view}>
                    <Text style={[styles.hatUnlockText, styles.extraTopMargin]}>How to unlock hats</Text>

                    <View style={styles.hat_unlock_guide}>
                    <Text style={styles.text}>1. Log into the app everyday to earn xp.</Text>
                    <Text style={styles.text}>2. Play your games located in gamehub!</Text>
                    <Text style={styles.text}>3. Earn enough xp to level up your corgi.</Text>
                    <Text style={styles.text}>4. When your Corgi levels up go to your corgi wardrobe and choose your new hat!</Text>
                    </View>
                    
                </View>

                <View style={styles.flat_list_view}>
                    <FlatList
                        data={images}
                        renderItem={renderItem}
                        keyExtractor={(index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                    />
                    <View style={styles.hat_unlock_view}>
                    <Text style={styles.textBigger}>New hats coming soon for levels 6 - 12.</Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6495ED',
        ...StyleSheet.absoluteFillObject,
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
    usernameContainer: {
        alignItems: 'center',
        marginTop: 130,
    },
    userProfilePictureContainer: {
        alignItems: 'center',
        padding: 20,
    },
    doggoImage: {
        width: 200,
        height: 200,
    },
    hat_unlock_view: {
        marginVertical: 60, // Use margin instead of fixed top
        alignItems: 'center',
    },
    hat_unlock_guide:{
        alignItems: 'center',
        top: 60,

    },
    flat_list_view: {
        top: 10,
        marginVertical: 40, // Use margin instead of fixed top
    },
    xp_text: {
        alignItems: 'center',
        marginVertical: 20, // Use margin instead of fixed top
    },
    center_bold_words:{
        alignItems: 'center',
        fontSize: 24,

    },
    back_arrow_img: {
        position: 'absolute',
        top: 20,
        left: 5,
        width: 75,
        height: 75,
        zIndex: 10, // Ensuring it's above other elements
    },
    
    hatUnlockSection: {
        width: '100%', 
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    hatUnlockText: {
        fontSize: 24,
        fontFamily: 'EBGaramond_800ExtraBold',
        marginBottom: 10,
        alignItems: 'center',
    },
    xpLeftText: {
        fontSize: 18, // Increase font size for XP LEFT message
        color: '#000000', // You can change the color if needed
        marginTop: 20, // Add margin for spacing
        alignItems: 'center',
    },
    extraTopMargin: {
        marginTop: 50, // Adjust for appropriate spacing
    },
    hatItem: {
        alignItems: 'center',
        margin: 10,
    },
    hatImage: {
        width: 100,  // Adjust the size as needed
        height: 100, // Adjust the size as needed
    },
    hatText: {
        color: '#000000',
        fontFamily: 'EBGaramond_600SemiBold',
        textAlign: 'center',
    },
    row: {
        justifyContent: 'space-around',
    },
});







