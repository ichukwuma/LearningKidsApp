import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, Pressable, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import entities from '../entities';
import Treat from '../components/Treat';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const TREAT_SIZE = 50; // Moved treatSize to a constant at component level
//importing questions
//import TreatQuestions from '../config/treat_questions';
// import { Questions } from './treat_questions';



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
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
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
  const [showHitbox, setShowHitbox] = useState(true); // Toggle to hide after testing



  const updateHandler = (entities, { time, dispatch }) => {
    let engine = entities.physics.engine;
    let world = engine.world;
    
    Matter.Engine.update(engine, time.delta);

    if (running && Math.random() < 0.03) {
      const newTreat = createTreat(world);
      const newTreatId = `treat-${Date.now()}`;
      entities[newTreatId] = newTreat;
    };
    //removed semicolon from above line, idk if needed

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

        ///////
        // from previous implementation

        // Matter.Body.setVelocity(treat.body, { x: 0, y: 5 });
        
        // if (treat.body.position.y > height + 50) {
        //   Matter.World.remove(world, treat.body);
        //   delete entities[key];
        // }
        ////////

        // Now using TREAT_SIZE constant
        if (treat.body.position.y > height + TREAT_SIZE) {
          Matter.Composite.remove(world, treat.body);
          delete entities[key];
        }
        
        if (entities.Corgi && Matter.Collision.collides(treat.body, entities.Corgi.body)) {
          if (treat.treatType === 'good') {
            setScore(prevScore => prevScore + 1);
          } else {
            setLives(prevLives => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                dispatch({ type: 'game_over' });
              }
              return newLives;
            });
          }
          Matter.World.remove(world, treat.body);
          delete entities[key];
        }
        //added this for treat generation fix
        const treatLifetime = Date.now() - treat.created;
        if (treatLifetime > 10000) {
          Matter.Composite.remove(world, treat.body);
          delete entities[key];
        }
      }
    });

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
        {!running && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.finalScoreText}>Final Score: {score}</Text>
            <Pressable style={styles.gameOverBackButton} onPress={gameOverBackButton}>
              <Text style={styles.buttonText}>Back to Game Hub</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

// Stylesheets
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
});


export default TreatFalls;