import { Alert, Button, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, Modal, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { Questions } from '../config/questions';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

export default function Page() {
  const [emergencyContact, setEmergencyContact] = useState(''); // State for the emergency contact info

  useEffect(() => {
    // Function to fetch emergency contact info from Firestore
    const fetchEmergencyContact = async () => {
      try {
        // Replace these with actual parent and child names
        const parentName = "Parent1";
        const childName = "Child1";

        // Reference the emergency contact info for a specific child under a parent
        const docRef = doc(db, `ParentsCollection/${parentName}/ChildrenCollection/${childName}/EmergencyContactsCollection/Contact1`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Assuming the document contains fields like 'name', 'relationship', 'address', 'phone'
          const contactData = docSnap.data();
          const contactInfo = `
            Name: ${contactData.name}
            Relationship: ${contactData.relationship}
            Address: ${contactData.address}
            Phone: ${contactData.phone}
          `;
          setEmergencyContact(contactInfo); // Set the fetched data
        } else {
          console.log("No emergency contact info found");
        }
      } catch (error) {
        console.error('Error fetching emergency contact: ', error);
      }
    };

    fetchEmergencyContact(); // Fetch data when the component mounts
  }, []);

//score
  const increaseNum = 10;
  const [score, setScore] = useState(0);
  const incrementScore = () => {
    setScore(score + increaseNum);
  };
//testing health
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
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


// random number generator
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}
const randomNum = getRandomNumber(0,Questions.length);


//Questions
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

const handleRight = () => {
  if(currentQuestionIndex === Questions.length -1){
    return;
  }
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};


const [questionNumber, setQuestionNumber ]= useState(1);
const incrementQuestionNumber = () => {
  if(questionNumber < 7)
  {
    setQuestionNumber(questionNumber + 1);
  }
  
}



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




        <Link href="/" asChild>
          <Pressable style={styles.Backbutton}>
              <Text>Back To Index</Text>
          </Pressable>
        </Link>


        <View style={styles.hearts}>
          <Image source={require('../../assets/heartIcon.png')}/>
          <Image source={require('../../assets/heartIcon.png')}/>
          <Image source={require('../../assets/heartIcon.png')}/>
        </View>

        {/* <View style = {styles.healthTest}>
          <Text>(Testing Purposes) Health: {health}</Text>
        </View> */}
        <View style={styles.score}>
          <Text style={styles.scoreText}>XP: </Text>
          <Text style={styles.scoreText}>{questionNumber} OF 7</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.questionArea}>
          <Text style={styles.questionText}>{Questions[currentQuestionIndex].question}</Text>
          {/* {Questions.map((item) => (
            <View>
              <Text>{item.question}</Text>
            </View>
          ))} */}
          
          
          {/*<TextInput style={styles.questions} placeholder='Questions will go here'></TextInput>*/}
        </View>

        

        <View style={styles.answerArea}>
        {Questions[currentQuestionIndex].options.map((option) => (
          <Pressable onPress={() => {handleRight(); incrementQuestionNumber();}}>
            <View style={styles.answers}>
                <Text style={styles.answerText}>{option}</Text>
            </View>
          </Pressable>
          ))}
        </View>

        {/* <View style= {styles.testArea}>
          <Pressable style={styles.button} onPress={incrementScore}>
              <Text>Increment Score</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={decrementHealth}>
              <Text>Decrement Health</Text>
          </Pressable>
        </View> */}
        
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
    backgroundColor: '#f7e7b4',
    borderRadius: 5,
    marginVertical: 10, 
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 5,
    left: 5,
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


  // questions:{
  //   flexDirection: 'row',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   alignSelf: 'baseline',
  //   alignContent: 'center',
  //   borderRadius: 15,
  //   height: "90%",
  //   width: "90%",
  //   justifyContent: 'center',
  //   paddingHorizontal: 20,
  // },
  

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

  // answers: {
  //   flexDirection: 'row',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   alignContent: 'center',
  //   borderRadius: 15,
  //   width: '25%',
  //   justifyContent: 'center',
  //   paddingHorizontal: 20,

  // },
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


});