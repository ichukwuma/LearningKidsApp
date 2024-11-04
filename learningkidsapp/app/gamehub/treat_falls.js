import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, Pressable, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import entities from '../entities';
import Treat from '../components/Treat';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get, update } from 'firebase/database';
import { auth } from '../config/firebaseConfig';
import TreatQuestions from '../config/treat_questions';


const { width, height } = Dimensions.get('window');
const TREAT_SIZE = 50; // Moved treatSize to a constant at component level

//Hitbox definition for debugging, toggle off and on
// const Hitbox = ({ x, y, width, height }) => {
//   return (
//     <View
//       style={{
//         position: 'absolute',
//         left: x,
//         top: y,
//         width: width,
//         height: height,
//         borderWidth: 2,
//         borderColor: 'red',
//         backgroundColor: 'rgba(255, 0, 0, 0.3)',
//       }}
//     />
//   );
// };

//TreatFalls component
const TreatFalls = () => {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [score, setScore] = useState(0); // total game points (per game)
  const [lives, setLives] = useState(3);
  const [showQuestionModal, setShowQuestionModal] = useState(false); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //choose index of question to show (randomly generated later)
  const [isGameOver, setGameOver] = useState(false); // State for game over
  const [xpPoints, setXpPoints] = useState(0); // State to track XP points separate from total game points
  const [questionsAnswered, setQuestionsAnswered] = useState(0); // Track the number of questions answered
  const totalXp = score + xpPoints; // total XP earned per game (including in-game score + XP from correctly answered questions)


  
  const entitiesRef = useRef(entities());

       //route for back button
       const route = useRoute();
       const { child_username } = route.params; // Access the child's username
       const navigation = useNavigation();
      //back button on the main game screen
       const backButton = () => {
           navigation.navigate('gamehub/gamehub_mainscreen', {child_username}); 
       };
       //back button on the game over screen
       const gameOverBackButton = () => {
        navigation.navigate('gamehub/gamehub_mainscreen', {child_username}); 
    };

    useEffect(() => {
      setRunning(true);
      setGameOver(false); // Reset game over state when component mounts
    }, []);


//Treat generator
  const createTreat = (world) => {
    // Use TREAT_SIZE instead of local treatSize variable
    const x = Math.random() * (width - TREAT_SIZE * 2) + TREAT_SIZE;
    const y = -TREAT_SIZE * 2;
    const treatType = Math.random() > 0.3 ? 'good' : 'bad';

    const treat = Matter.Bodies.rectangle(x, y, TREAT_SIZE, TREAT_SIZE, {
      label: 'Treat',
      frictionAir: 0.2,
      friction: 0,
      restitution: 0,
      isSensor: true,
      isStatic: false,
      density: 0.001,
    });
    //the set of velocity of treats
    Matter.Body.setVelocity(treat, { x: 0, y: 0.1 });
    Matter.World.add(world, treat);

    Matter.World.add(world, treat);

    return {
      body: treat,
      treatType,
      renderer: <Treat />,
      //new thing
      created: Date.now()
    };
  };

  //hitbox conditional state for debugging
  // const [showHitbox, setShowHitbox] = useState(true); // Toggle to hide after testing

//Question Answering
  const handleAnswerSelection = (selectedIndex) => {
    const correctAnswer = TreatQuestions[currentQuestionIndex].answer;
    if (selectedIndex === correctAnswer) {
      // Reward or provide feedback for the correct answer
      // Increase XP by 20 on a correct answer
      setXpPoints(prevXp => prevXp + 20);
      // else, no negative effects
    //For negative effects on if incorrect answer, or to remove lives 
    // } else {
    //   setLives(prevLives => {
    //     const newLives = prevLives - 1;
    //     if (newLives <= 0) {
    //       setGameOver(true); // Set game over state
    //       setRunning(false); // Stop the game
    //     }
    //     return newLives;
    //   });
    }
    // question counter
    setQuestionsAnswered(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 3) {
        setGameOver(true);
        setRunning(false); // End the game when 3 questions are answered
      }
      return newCount;
    });

    setShowQuestionModal(false);
    setRunning(true); // Resume the game after answering
  };


  const updateHandler = (entities, { time, dispatch }) => {
    let engine = entities.physics.engine;
    let world = engine.world;
    
    Matter.Engine.update(engine, time.delta);

    if (running && Math.random() < 0.03) {
      const newTreat = createTreat(world);
      const newTreatId = `treat-${Date.now()}`;
      entities[newTreatId] = newTreat;
    };

    Object.keys(entities).forEach(key => {
      if (key.startsWith('treat')) {
        const treat = entities[key];
        //added this
        if (!treat || !treat.body) return;

        // one of the factors for changing speed of treats falling
        const currentVelocity = treat.body.velocity;
        const targetVelocity = 0.5;

        if (Math.abs(currentVelocity.y) < targetVelocity) {
          Matter.Body.setVelocity(treat.body, {
            x: currentVelocity.x,
            y: targetVelocity
          });
        }

        // Now using TREAT_SIZE constant
        if (treat.body.position.y > height + TREAT_SIZE) {
          Matter.Composite.remove(world, treat.body);
          delete entities[key];
        }

        //Question Generation with Collision Updated
        // Handle collisions only if the game is running
      if (running && entities.Corgi && Matter.Collision.collides(treat.body, entities.Corgi.body)) {
        if (treat.treatType === 'good') {
          setScore(prevScore => {
            const newScore = prevScore + 1;

            // Check if a question should be shown
            if (newScore % 30 === 0 && questionsAnswered < 3) { // Show a question every 30 points, up to 3 times
              setShowQuestionModal(true);
              setCurrentQuestionIndex(Math.floor(Math.random() * TreatQuestions.length));
              setRunning(false); // Pause the game

            // if (newScore % 30 === 0) { //change number to adjust when a question appears after x points collected
            //   setShowQuestionModal(true);
            //   setCurrentQuestionIndex(Math.floor(Math.random() * TreatQuestions.length));
            //   setRunning(false); // Pause the game

              
              // Clear existing treats when question appears
              Object.keys(entities).forEach(key => {
                if (key.startsWith('treat')) {
                  Matter.World.remove(world, entities[key].body);
                  delete entities[key];
                }
              });

            }
            return newScore;
          });
        } else {
          setLives(prevLives => {
            const newLives = prevLives - 1;
            if (newLives <= 0) {
              setGameOver(true);
              dispatch({ type: 'game_over' });
            }
            return newLives;
          });
        }
        Matter.World.remove(world, treat.body);
        delete entities[key];
      }
//end of question gen + treat collisions

        //Treat Lifetime Management
        const treatLifetime = Date.now() - treat.created;
        if (treatLifetime > 10000) {
          Matter.Composite.remove(world, treat.body);
          delete entities[key];
        }
      }
    });

     //function to update XP
//   const updateUserXp = async (totalXp) => {
//     const parentId = auth.currentUser?.uid;
//     if (parentId) {
//         const childRef = ref(getDatabase(), `parents/${parentId}/children/${child_username}`);
//         await update(childRef, {
//             totalXP: totalXP,  // Update the total XP
//         }).catch((error) => {
//             console.error("Error updating XP: ", error);
//         });
//     }
// };

    //idk about this but it sets game over if lives fall under zero or more than 3 questions are answered
    // Handle game over condition based on lives
  if (lives <= 0 || questionsAnswered >= 3) {
    setGameOver(true);
    setRunning(false);
    // updateUserXp(totalXp); // Call the function to update XP
    dispatch({ type: 'game_over' });
  }

    return entities;
  };
  
 


  //Screen appearance
  return (
    <ImageBackground 
      source={require('../../assets/treatfallsbg.png')} 
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={backButton}>
          <Image source={require('../../assets/back_arrow.png')} style={styles.backArrowImage} />
        </Pressable>
        {/* Game Engine */}
        <GameEngine
          ref={(ref) => { setGameEngine(ref) }}
          style={styles.gameContainer}
          systems={[updateHandler]}
          entities={entitiesRef.current}
          running={running}
          onEvent={(e) => {
            if (e.type === 'game_over') {
              setRunning(false);
              gameEngine.stop();
            }
          }}
        />

      {/* Hitbox Rendering for Debugging, Toggle off and on */}
      {/* {showHitbox && entitiesRef.current.Corgi && (
        <Hitbox
          x={entitiesRef.current.Corgi.body.bounds.min.x}
          y={entitiesRef.current.Corgi.body.bounds.min.y}
          width={entitiesRef.current.Corgi.body.bounds.max.x - entitiesRef.current.Corgi.body.bounds.min.x}
          height={entitiesRef.current.Corgi.body.bounds.max.y - entitiesRef.current.Corgi.body.bounds.min.y}
        />
      )} */}

      {/* Displaying score and lives on screen */}
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.lives}>Lives: {lives}</Text>

      {/* Game Over Overlay */}
        {isGameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.finalScoreText}>Final Score: {score}</Text>
            <Text style={styles.finalXpText}>Question XP Bonus: + {xpPoints}</Text>
            <Text style={styles.totalXpText}>Total XP Earned: {totalXp}</Text>
            <Pressable style={styles.gameOverBackButton} onPress={gameOverBackButton}>
              <Text style={styles.buttonText}>Back to Game Hub</Text>
            </Pressable>
          </View>
        )}

      {/* Question Generation */}
      {showQuestionModal && (
            <Modal
                transparent={true}
                animationType="slide"
                visible={showQuestionModal}
                onRequestClose={() => setShowQuestionModal(false)}
            >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                      <Text style={styles.questionText}>
                          {TreatQuestions[currentQuestionIndex].question}
                      </Text>
                      {TreatQuestions[currentQuestionIndex].options.map((option, index) => (
                          <Pressable
                              key={index}
                              style={styles.optionButton}
                              onPress={() => handleAnswerSelection(index)}
                          >
                              <Text style={styles.optionText}>{option}</Text>
                          </Pressable>
                      ))}
                  </View>
                </View>
            </Modal>
        )}
{/* End of Render */}
      </View>
    </ImageBackground>
  );
};

// Stylesheets
const styles = StyleSheet.create({
  // container: {
  //   justifyContent: 'center',
  //   alignItems: 'center',       
  //   backgroundColor: '#A7C7E7',
  //   ...StyleSheet.absoluteFillObject
  // },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    // ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  score: {
    position: 'absolute',
    top: 80,
    right: 20,
    fontSize: 24,
    zIndex: 1,
    color: 'white', // Changed to white for better visibility on background
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  lives: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontSize: 24,
    zIndex: 1,
    color: 'white', // Changed to white for better visibility on background
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  gameOverText: {
    fontSize: 48,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'EBGaramond_800ExtraBold'
  },
  gameOverBackButton:{
    width: 175, // Set a fixed width or use maxWidth
    padding: 10,
    marginTop: 50,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'EBGaramond_800ExtraBold'
  },
  finalScoreText: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'EBGaramond_800ExtraBold'
  },
  finalXpText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontFamily: 'EBGaramond_800ExtraBold'
  },
  totalXpText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontFamily: 'EBGaramond_800ExtraBold'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backArrowImage: {
    width: 50,
    height: 50,
  },
//question generation styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  questionText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'EBGaramond_600SemiBold'
  },
  optionButton: {
    backgroundColor: '#f7e7b4',
    padding: 10,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
    fontFamily: 'EBGaramond_600SemiBold'
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'EBGaramond_600SemiBold'
    
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
      width: '80%', // Width of the card
      backgroundColor: '#A7C7E7', // White background for the card
      borderRadius: 10, // Rounded corners
      padding: 20, // Padding inside the card
      elevation: 10, // Shadow effect on Android
      shadowColor: '#000', // Shadow color for iOS
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
  },
});


export default TreatFalls;