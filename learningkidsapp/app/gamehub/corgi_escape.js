import { Alert, Button, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, Modal, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { Questions } from '../config/questions';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { database } from '../config/firebaseConfig'; // Your Firebase config
import { ref, onValue } from 'firebase/database';
import { auth } from '../config/firebaseConfig';

export default function Page() {

    const [contacts, setContacts] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [answer, setAnswer] = useState('');
  
    useEffect(() => {
      const fetchContacts = async () => {
        const parentId = auth.currentUser?.uid; // Get the current user's ID
        const childId = 'EmergencyContacts'; // Replace with actual child ID logic
  
        if (!parentId || !childId) {
          Alert.alert('Error', 'Parent or Child ID missing.');
          return;
        }
  
        const contactsRef = ref(database, `parents/${parentId}/children/${childId}/emergencyContacts`);
        onValue(contactsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const loadedContacts = Object.keys(data).map(key => ({ ...data[key], key }));
            setContacts(loadedContacts);
  
            // Randomly select a contact
            if (loadedContacts.length > 0) {
              const randomIndex = Math.floor(Math.random() * loadedContacts.length);
              const randomContact = loadedContacts[randomIndex];
              setCurrentQuestion(`What is ${randomContact.name}'s phone number?`);
              setAnswer(randomContact.phone); // Set the answer based on the selected contact
            }
          } else {
            setContacts([]);
            setCurrentQuestion('');
            setAnswer('');
          }
        });
      };
  
      fetchContacts();
    }, []);
  
    const handleAnswerSelection = () => {
      Alert.alert(`The answer is: ${answer}`); // Show the phone number
    };















  const [emergencyContact, setEmergencyContact] = useState(''); // State for the emergency contact info


//score
  const increaseNum = 10;
  const [score, setScore] = useState(0);
  const incrementScore = () => {
    setScore(score + increaseNum);
  };
//testing health
//hearts
  const [imageCount, setImageCount] = useState(3);
  const imageSources = [
    require('../../assets/heartIcon.png'),
    require('../../assets/heartIcon.png'),
    require('../../assets/heartIcon.png'),
  ];

  const [health, setHealth] = useState(3);
  const decrementHealth = () => {
    setHealth(health => Math.max(health - 1, 0));
  };
//hint modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    // setTimeout(() => {
    //   setIsModalVisible(false);
    // }, 9000); 
  };
 
//retry modal
const [isRetryModalVisible, setIsRetryModalVisible] = useState(false);
const showRetryModal = () => {
  setIsRetryModalVisible(true);
}

//pause modal
const [isPauseModalVisisble, setIsPauseModalVisible] = useState(false);
const showPauseModal = () => {
  setIsPauseModalVisible(true);
}


// random number generator
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}
const randomNum = getRandomNumber(0,Questions.length);


//Questions
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedOption, setSelectedOption] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);

//console.log({isCorrect});
//handle pressed option
const handleOptionPress = (pressedOption) => {
  setSelectedOption(answer);
  // test
  //Alert.alert(answer);

  const isAnswerCorrect = Questions[currentQuestionIndex].answer === pressedOption;
  setIsCorrect(isAnswerCorrect)

  if(pressedOption != Questions[currentQuestionIndex].incorrect){
    increaseXP();
    incrementScore();
  }
  else{
    setImageCount(imageCount-1);
    if(imageCount == 1)
    {
      setIsRetryModalVisible(true);
    }


  }
};

const getBackgroundColor = (option) => {
  if (selectedOption === option) {
    return isCorrect ? 'red' : 'green'; // Correct answer -> green, Incorrect answer -> red
  }
  return 'rgba(211, 211, 211, 0.3)'; // Default background for unselected options
};




//next question
// const handleNext = () => {
//   if(currentQuestionIndex === 6){
//     return;
//   }
//   else{
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//     setSelectedOption(null);
//   }

  
// };

// next question
const handleNext = () => {
  // Check if there are more questions to load
  if (currentQuestionIndex < Questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionNumber(prevNumber => prevNumber + 1); // Increase question number
    setSelectedOption(null); // Reset selected option
    setIsCorrect(null); // Reset answer feedback
  } else {
    Alert.alert("You've reached the last question!");
  }
};





//Questions out of 7
const [questionNumber, setQuestionNumber ]= useState(1);
const incrementQuestionNumber = () => {
  if(questionNumber < 7)
  {
    setQuestionNumber(questionNumber + 1);
  }
  
}
//xp
const xpIncreaseAmount = 5
const [currentXP, setCurrentXP] = useState(0);
const increaseXP = () => {
  setCurrentXP(currentXP + xpIncreaseAmount);
};

const resetGame = () => {
  setImageCount(3); 
  setScore(0);
  setCurrentQuestionIndex(0); 
  setQuestionNumber(1); 
  setCurrentXP(0); 
  setIsRetryModalVisible(false);
  setSelectedOption(null);
  setIsCorrect(null);
};



//answer array randomize


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const answersArray = [
  <Pressable key={1} style={styles.answers} onPress={() => handleOptionPress(answer)}>
    <Text style={styles.answerText}>{answer || 'Select an answer'}</Text>
  </Pressable>,
  <Pressable key={2} style={styles.answers} onPress={() => handleOptionPress(Questions[currentQuestionIndex].incorrect)}>
    <Text style={styles.answerText}>{Questions[currentQuestionIndex].incorrect || 'Missing contact information'}</Text>
  </Pressable>,
  <Pressable key={3} style={styles.answers} onPress={() => handleOptionPress(Questions[currentQuestionIndex].incorrect)}>
    <Text style={styles.answerText}>{Questions[currentQuestionIndex].incorrect || 'Missing contact information'}</Text>
  </Pressable>
];

// Shuffle the answers before rendering
const shuffledAnswers = shuffleArray(answersArray);



  return (
    <ImageBackground source={require('../../assets/CorgiEscapeBG.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        {/* test hint button works */}
          <Modal animationType='slide' transparent={true} visible={isModalVisible}>
            <View style={styles.modalWrapper}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hint 1 used.</Text>
              </View>
              <Pressable style={styles.ModalButton} onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </Modal>

        {/* Retry Modal */}
        <Modal animationType='slide' transparent={true} visible={isRetryModalVisible}> 
          <View style={styles.retryModalWrapper}>
            <View style={styles.retryBox}>
                <View style ={{position: 'absolute', top: 10}}>
                  <Text style={styles.answerText}>
                    OH NO! You ran out of lives. Would you like to retry.
                  </Text>
                </View>
              <View style={styles.retryOptionsArea}>
                <Link href="/gamehub/corgi_escape" asChild onPress={resetGame}>
                <Pressable style={styles.retryOptions} onPress={() => setIsRetryModalVisible(!isRetryModalVisible)}>
                  <Text style={styles.answerText}>
                    Retry
                  </Text>
                </Pressable>
                </Link>
                <Link href="/gamehub/gamehub_mainscreen" asChild>
                  <Pressable style={styles.retryOptions}>
                    <Text style={styles.answerText}>
                      Game Hub
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </Modal>

        {/* Pause Modal */}
        <Modal animationType='slide' transparent={true} visible={isPauseModalVisisble}>
          <View style={styles.retryModalWrapper}>
            <View style={styles.retryBox}>
              <View style ={{position: 'absolute', top: 10}}>
                <Text style={styles.answerText}>
                  Game Paused
                </Text>
              </View>
              <View style={styles.retryOptionsArea}>
                <Pressable style={styles.retryOptions} onPress={() => setIsPauseModalVisible(false)}>
                  <Text style={styles.answerText}>
                    Resume
                  </Text>
                </Pressable>
                <Pressable style={styles.retryOptions}>
                  <Text style={styles.answerText}>
                    Settings
                  </Text>
                </Pressable>
                <Link href="/gamehub/gamehub_mainscreen" asChild>
                  <Pressable style={styles.retryOptions}>
                    <Text style={styles.answerText}>
                      GameHub
                    </Text>
                  </Pressable>
                  </Link>
              </View>
            </View>
          </View>
        </Modal>






        
          <Pressable style={styles.Backbutton} onPress={() => setIsPauseModalVisible(true)}>
          <Image source={require('../../assets/pause_button.png')}/>
          </Pressable>
        
        <View>
          <Text style={styles.QuestionOrder}>{questionNumber} OF 7</Text>
        </View>
        <View style={styles.hearts}>
          {imageSources.slice(0, imageCount).map((source, index) => (
          <Image 
          key={index} 
          source={source}
          />))}
          {imageCount === 0 && (
          <View style={styles.emptyHeartsPlaceholder}>
          {/* Empty hearts placeholder */}
        </View>
  )}

        </View>

        {/* <View style = {styles.healthTest}>
          <Text>(Testing Purposes) Health: {health}</Text>
        </View> */}
        <View style={styles.score}>
          <Text style={styles.scoreText}>XP: {currentXP}</Text>
          
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.questionArea}>
          <Text style={styles.questionText}>{currentQuestion}</Text>
          {/* {Questions.map((item) => (
            <View>
              <Text>{item.question}</Text>
            </View>
          ))} */}
          
          
          {/*<TextInput style={styles.questions} placeholder='Questions will go here'></TextInput>*/}
        </View>

        <View style={styles.answerArea}>
        {shuffledAnswers.map((answerComponent) => answerComponent)}
        
         
          {/*
          <Pressable style={styles.answers} onPress={() => handleOptionPress(answer)}>
            <Text style={styles.answerText}>{answer || 'Select an answer'}</Text>
          </Pressable>
          <Pressable style= {styles.answers} onPress={() => handleOptionPress(Questions[currentQuestionIndex].incorrect)}>
            <Text style={styles.answerText}>{Questions[currentQuestionIndex].incorrect || 'Missing contact information'}</Text>  
          </Pressable>
          <Pressable style= {styles.answers} onPress={() => handleOptionPress(Questions[currentQuestionIndex].incorrect)}>
            <Text style={styles.answerText}>{Questions[currentQuestionIndex].incorrect || 'Missing contact information'}</Text>  
          </Pressable> */}

        {/* {Questions[currentQuestionIndex].options.map((option) => (
          <Pressable style= {[styles.answers, { backgroundColor: selectedOption === option ? (isCorrect ? 'rgb(126, 242, 94)' : 'red') : 'rgba(211, 211, 211, 0.3)' }]}
           onPress={() => handleOptionPress(option)}
           //one answer at a time
           disabled={selectedOption}>
            <View>
                <Text style={styles.answerText}>{option}</Text>
            </View>
          </Pressable>
          ))} */}
        </View>



        <View style = {styles.nextButtonArea}>
          <Pressable style = {({ pressed }) => [styles.nextButton, pressed ? styles.pressedNextButton : styles.nextButton]}
           onPress={() => {handleNext();}}>
            <Text>NEXT</Text>
          </Pressable>
        </View>

      <View style = {styles.hintArea}>
      <Pressable onPress={showModal}>
        <Image source={require('../../assets/games/hint2x.png')}/>
      </Pressable>
      <Image source={require('../../assets/games/hint2x.png')}/>
      <Image source={require('../../assets/games/hint2x.png')}/>


      </View>

      </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
  },

  Backbutton: {
    maxWidth: 200, // Set a fixed width or use maxWidth
    padding: 10,
    //backgroundColor: '#f7e7b4',
    //borderRadius: 5,
    //marginVertical: 10, 
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 5,
    left: 5,
  },
  //modal background
  retryModalWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },

  retryBox:{
    height: '25%',
    width:'80%',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#A7C7E7',
    borderRadius: 15,
    borderWidth: 2,


  },
  retryOptionsArea:{
    flexDirection: 'column',
    position:'absolute',
    bottom: 0,
    gap: 5,
    width: "100%",
    justifyContent: 'space-between',
    padding: 25,
    alignItems: 'center',
    


  },
  retryOptions:{
    borderRadius: 7,
    alignItems: 'center',
    alignContent:'center',
    paddingVertical: 3,
    width: '90%',
    backgroundColor: '#f7e7b4',
    borderWidth: 1,
    
  },

  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(128, 128, 128, 0.4)',
  },
  modalView: {
    width: '70%',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 165,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 14,
  },

  
  healthTest: {
    alignSelf: 'flex-end',

  },
  
  testArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',


  },
  
  hintArea:
  {
    width: '100%',
    //height: '33%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    marginBottom: 50,
    alignItems: 'flex-end',

  },



  
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 16, // Padding around the container
    //backgroundColor: '#A7C7E7',
    
  },

  hearts: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'right',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginTop: 15,
  },

  score: {
    width: '100%',
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    justifyContent: 'space-between',
    //justifyContent: 'space-around',
    paddingHorizontal: 10,

  },

  scoreText:{
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
  },
  QuestionOrder:{
    fontSize: 25,
    fontFamily: 'EBGaramond_800ExtraBold',
    color: 'white',
    textShadowColor: 'black', // Outline color
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, // Blur radius for the shadow
    position: 'absolute',
    top: 10,
    left: '41.5%',
  },

  questionArea:{
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 250,
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 10,
  },

  answerArea: {
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 5,
    marginTop: 10,
    justifyContent: 'space-between',
    fontFamily: 'EBGaramond_800ExtraBold',
  
  },

  answers: {
    //backgroundColor: '#f5e8c7',
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    alignContent: 'center',
    borderRadius: 15,
    height: 100,
    //width: 400,
    minWidth: '100%',
    justifyContent: 'center',
    fontFamily: 'EBGaramond_800ExtraBold',
   
   
  },
  pressedAnswer: {
    backgroundColor: 'rgba(211, 211, 211, 0.7)',

  },

  button: {
    width: 200, // Set a fixed width or use maxWidth
    padding: 10,
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },
  
  ModalButton: {
    width: 200, // Set a fixed width or use maxWidth
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center'
  },

  text: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'EBGaramond_800ExtraBold'
},

questionText:
{
  fontSize: 25,
  fontFamily: 'EBGaramond_800ExtraBold',
  color: 'white',
  textShadowColor: 'black', // Outline color
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 1, // Blur radius for the shadow
},

answerText: {
  fontSize: 25,
  fontFamily: 'EBGaramond_800ExtraBold',
  color: 'white',
  textShadowColor: 'black', // Outline color
  textShadowOffset: { width: 2, height: 2 }, 
  textShadowRadius: 1, // Blur radius for the shadow
  
  //width: '90%',
  //height: '100%',
  textAlign: 'center',
  textAlignVertical: 'center',
  alignItems: 'center',
  borderRadius: 15,
},

nextButtonArea: {
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',


},

nextButton: {
  padding: 10,
  backgroundColor: '#f7e7b4',
  borderRadius: 5,
  alignItems: 'center',
  minWidth: '75%',


},
pressedNextButton: {
  backgroundColor: '#d9ca9c',

},
emptyHeartsPlaceholder: {
  width: "100%", 
  height: 32, 
},


});