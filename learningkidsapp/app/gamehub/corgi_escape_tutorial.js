import React from 'react';
import { Pressable, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Button(clickButton) {
  const route = useRoute();
  const { child_username } = route.params;
  const navigation = useNavigation();

  // Loading fonts here
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold, 
    EBGaramond_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  // Use navigation to go back to the previous screen
  const handlePress = () => {
    navigation.navigate('gamehub/gamehub_mainscreen', { child_username });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
      HOW TO PLAY CORGI ESCAPE:
      </Text>
      <Text style={styles.text}>
      Your corgi is stuck in the park!</Text>
      <Text style={styles.text}>
      You are given seven questions. Answer each question to escape! </Text>
      <Text style={styles.text}>
      The more answers you get correct, the more your XP goes up! </Text>
      <Text style={styles.text}>
      You only have 3 lives, good luck! </Text>

      <Image style={styles.tutorialimage} source={require('../../assets/corgiescapetutorial.png')} resizeMode="contain"></Image>
    
      <Pressable style={styles.gamehubButton} onPress={handlePress}>
        <Text style={styles.text}>Back to Gamehub</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#A7C7E7',
    padding: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  tutorialimage: {
    width: 450,
    height: 450,
  },
  gamehubButton: {
    width: 175,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    padding: 10, // Add padding to make it easier to press
  },
});
