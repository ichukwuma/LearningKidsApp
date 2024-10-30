import { ref, onValue } from 'firebase/database';
import { auth, database } from '../config/firebaseConfig'; // Ensure you import your Firebase configuration

// questions.js
export const Questions = [
    { question: "What is {name}'s phone number?", key: "phone", incorrect: 'Wrong' },
    { question: "What is {name}'s address?", key: "address", incorrect: 'Wrong' },
    { question: "What is {name}'s relationship to you?", key: "relationship", incorrect: 'Wrong' },
    { question: "What is {name}'s phone number?", key: "phone", incorrect: 'Wrong' },
    { question: "What is {name}'s address?", key: "address", incorrect: 'Wrong' },
    { question: "What is {name}'s relationship to you?", key: "relationship", incorrect: 'Wrong' },
    { question: "What is {name}'s relationship to you?", key: "relationship", incorrect: 'Wrong' },
    { question: "What is {name}'s relationship to you?", key: "relationship", incorrect: 'Wrong' }
  ];
  