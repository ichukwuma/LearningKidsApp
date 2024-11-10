import React from 'react';
import { Pressable, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { useFonts, EBGaramond_600SemiBold, EBGaramond_800ExtraBold } from '@expo-google-fonts/eb-garamond';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function Button(clickButton) {
  // Loading fonts here
  let [fontsLoaded] = useFonts({
    EBGaramond_600SemiBold, EBGaramond_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  // Buttons for screens
  const { onPressGamehub, gamehubScreenBtn = 'gamehub/gamehub_mainscreen' } = clickButton;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>
        Tutorial for Treat Falls:
      </Text>

      <Image
        style={styles.tutorialimage}
        source={require('../../assets/treatfallstutorial.png')}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        The upper right-hand corner displays how much lives you have left and your total score.
      </Text>
      <Text style={styles.text}>
        Questions will be displayed when you get 30 score, and you will have the chance to answer questions to get more points. For each question answered correctly, you get an extra 20 points.
      </Text>
      <Text style={styles.text}>
        Move corgi left or right to catch treats and dodge anchors. Touching anchors causes your life to go down.
      </Text>
      
      <Link href="gamehub/gamehub_mainscreen" asChild>
        <Pressable style={styles.gamehubButton} onPressGamehub={onPressGamehub}>
          <Text style={styles.text}>Back to Gamehub</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Ensure content expands to take up available space
    justifyContent: 'flex-start', // Aligns items to the top
    alignItems: 'center',          // Centers items horizontally
    backgroundColor: '#A7C7E7',
    padding: 20,                   // Add some padding for better spacing
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold',
    marginTop: 20, // Adjusts distance between image and text
    textAlign: 'center', // Centers the text itself
    marginBottom: 20,
  },
  tutorialimage: {
    width: 450,     // Set the width of the image
    height: 450,
  },
  gamehubButton: {
    width: 175, // Set a fixed width or use maxWidth
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
});
