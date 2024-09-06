import React from 'react';
import { Pressable, Text, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';



export default function Button(clickButton) {
    const { onPressCorgiEscapeTutorial, corgiEscapeTutorialBtn = 'Tutorial' } = clickButton;
    const { onPressCorgiEscapeStart, corgiEscapeStartBtn = 'Start' } = clickButton;
    const { onPressTreatFallsTutorial, treatFallsTutorialBtn = 'Tutorial' } = clickButton;
    const { onPressTreatFallsStart, treatFallsStartBtn = 'Start' } = clickButton;
  return (
    
    <View style={styles.container}>
        <View>
            <Text style={styles.GameHubText}>Game Hub</Text>
        </View>


        <Text style={styles.CorgiEscapeText} >Corgi Escape</Text>
        <Link href="/gamehub/corgi_escape_tutorial" asChild>
            <Pressable style={styles.button} onPressCorgiEscapeTutorial={onPressCorgiEscapeTutorial}>
                <Text style={styles.text}>{corgiEscapeTutorialBtn}</Text>
            </Pressable>
        </Link>

        <Link href="/gamehub/corgi_escape" asChild>
            <Pressable style={styles.button} onPressCorgiEscapeStart={onPressCorgiEscapeStart}>
                <Text style={styles.text}>{corgiEscapeStartBtn}</Text>
            </Pressable>
        </Link>

        <Text style={styles.TreatFallsText}>Treat Falls</Text>
        <Link href="/gamehub/treat_falls_tutorial" asChild>
            <Pressable style={styles.button} onPressTreatFallsTutorial={onPressTreatFallsTutorial}>
                <Text style={styles.text}>{treatFallsTutorialBtn}</Text>
            </Pressable>
        </Link>

        <Link href="/gamehub/treat_falls" asChild>
            <Pressable style={styles.button} onPressTreatFallsStart={onPressTreatFallsStart}>
                <Text style={styles.text}>{treatFallsStartBtn}</Text>
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
        padding: 16, // Padding around the container
    },

    button: {
        width: 200, // Set a fixed width or use maxWidth
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginVertical: 10, // Vertical spacing between buttons
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    GameHubText: {
        fontSize: 40
    },
    CorgiEscapeText:{
        fontSize: 25
    },
    TreatFallsText:{
        fontSize: 25
    }

  });