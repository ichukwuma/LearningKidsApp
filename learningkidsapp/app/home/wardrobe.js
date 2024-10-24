import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { auth } from '../config/firebaseConfig';

const allImages = [
    require('../../assets/profiles/cherry_dog.png'),
    require('../../assets/profiles/pizza_dog.png'),
    require('../../assets/profiles/icecream_dog.png'),
    require('../../assets/profiles/banana_dog.png'),
    require('../../assets/profiles/avocado_level2_dog.png'), // Level 2 image for corgi user will unlock later
];

export default function CorgiWardrobe() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCorgi, setSelectedCorgi] = useState(null);
    const [level, setLevel] = useState(1);
    const [images, setImages] = useState([]); // State to hold the images based on level
    const navigation = useNavigation();
    const database = getDatabase();
    const router = useRouter();

    const route = useRoute();
    const { child_username } = route.params;

    const backButton = () => {
        navigation.navigate('home/home', { child_username });
    };

    useEffect(() => {
        const parentId = auth.currentUser?.uid;

        if (parentId) {
            const corgiRef = ref(database, `parents/${parentId}/children`);
            const unsubscribe = onValue(corgiRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const childData = Object.values(data).find(child => child.username === child_username);
                    if (childData) {
                        setLevel(childData.level || 1);
                        updateImages(childData.level);

                        // Set selectedCorgi based on saved data
                        const savedImage = childData.selectedHatImage;
                        if (savedImage) {
                            // Match the saved image to the image sources
                            const matchingImage = allImages.find(image => image === savedImage);
                            if (matchingImage) {
                                setSelectedCorgi(matchingImage);
                            } else {
                                // If saved image is not found, default to first available image
                                setSelectedCorgi(images[0] || allImages[0]);
                            }
                        }
                    }
                }
            });
            return () => unsubscribe();
        }
    }, [database]);

    const updateImages = (level) => {
        const availableImages = allImages.slice(0, 4); // Start with level 1 images

        if (level >= 2) {
            availableImages.push(allImages[4]); // Add level 2 image
        }

        setImages(availableImages);
        // Set default selectedCorgi to the first image in availableImages
        if (!selectedCorgi) {
            setSelectedCorgi(availableImages[0]);
        }
    };

    const handleSave = async () => {
        const parentId = auth.currentUser?.uid;

        if (!parentId) {
            Alert.alert('Error', 'Parent not authenticated.');
            return;
        }

        try {
            const corgiRef = ref(database, `parents/${parentId}/corgis/${parentId}`);
            await set(corgiRef, {
                selectedCorgi,
            });

            Alert.alert('Success', 'Corgi Profile Updated!');
            router.push({
                pathname: '/home/wardrobe',
                params: { child_username, selectedCorgi },
            });
            
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleImageSelect = (index) => {
        setCurrentImageIndex(index);
        setSelectedCorgi(images[index]);
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#6495ED', '#B0C4DE', '#6495ED']} style={styles.background} />

            <Pressable style={styles.back_arrow_img} onPress={backButton}>
                <Image source={require('../../assets/back_arrow.png')} style={styles.back_arrow_img} />
            </Pressable>

            <View style={styles.title_container}>
                <Text style={styles.title}>Hi {child_username},</Text>
            </View>

            <View style={styles.corgi}>
                {selectedCorgi && <Image source={selectedCorgi} style={styles.corgiImage} />}
            </View>

            <Text style={styles.text}>Choose a hat for your Corgi!</Text>
            <Text style={styles.text}>Tap on a corgi to choose a new</Text>
            <Text style={styles.text}>or scroll side to side.</Text>

            <FlatList
                data={images}
                horizontal
                keyExtractor={(index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => handleImageSelect(index)}>
                        <Image source={item} style={styles.scrollImage} />
                    </Pressable>
                )}
                showsHorizontalScrollIndicator={false}
            />

            <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.text}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 120,
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
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'EBGaramond_800ExtraBold',
    },
    corgi: {
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 160,
    },
    corgiImage: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
    },
    scrollImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginHorizontal: 10,
    },
    button: {
        width: 150,
        padding: 10,
        backgroundColor: '#f7e7b4',
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
    },
    text: {
        color: '#000000',
        fontSize: 20,
        fontFamily: 'EBGaramond_800ExtraBold',
    },
});

